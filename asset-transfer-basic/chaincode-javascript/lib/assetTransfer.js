/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                ID: 'asset1',
                Color: 'blue',
                Size: 5,
                Owner: 'Tomoko',
                AppraisedValue: 300,
            },
            {
                ID: 'asset2',
                Color: 'red',
                Size: 5,
                Owner: 'Brad',
                AppraisedValue: 400,
            },
            {
                ID: 'asset3',
                Color: 'green',
                Size: 10,
                Owner: 'Jin Soo',
                AppraisedValue: 500,
            },
            {
                ID: 'asset4',
                Color: 'yellow',
                Size: 10,
                Owner: 'Max',
                AppraisedValue: 600,
            },
            {
                ID: 'asset5',
                Color: 'black',
                Size: 15,
                Owner: 'Adriana',
                AppraisedValue: 700,
            },
            {
                ID: 'asset6',
                Color: 'white',
                Size: 15,
                Owner: 'Michel',
                AppraisedValue: 800,
            },
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreatePatientRecord(ctx, patientID, name, age, gender, diagnosis, doctor, admissionDate) {
        const patientRecord = {
            PatientID: patientID,
            Name: name,
            Age: parseInt(age),
            Gender: gender,
            Diagnosis: diagnosis,
            Doctor: doctor,
            AdmissionDate: admissionDate,
        };
        await ctx.stub.putState(patientID, Buffer.from(JSON.stringify(patientRecord)));
        return JSON.stringify(patientRecord);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadPatientRecord(ctx, patientID) {
        const recordJSON = await ctx.stub.getState(patientID);
        if (!recordJSON || recordJSON.length === 0) {
            throw new Error(`The patient record ${patientID} does not exist`);
        }
        return recordJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdatePatientRecord(ctx, patientID, name, age, gender, diagnosis, doctor, admissionDate) {
        const exists = await ctx.stub.getState(patientID);
        if (!exists || exists.length === 0) {
            throw new Error(`The patient record ${patientID} does not exist`);
        }

        const updatedPatientRecord = {
            PatientID: patientID,
            Name: name,
            Age: parseInt(age),
            Gender: gender,
            Diagnosis: diagnosis,
            Doctor: doctor,
            AdmissionDate: admissionDate,
        };
        await ctx.stub.putState(patientID, Buffer.from(JSON.stringify(updatedPatientRecord)));
        return JSON.stringify(updatedPatientRecord);
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeletePatientRecord(ctx, patientID) {
        const exists = await ctx.stub.getState(patientID);
        if (!exists || exists.length === 0) {
            throw new Error(`The patient record ${patientID} does not exist`);
        }
        await ctx.stub.deleteState(patientID);
        return `Patient record ${patientID} has been deleted`;
    }

    // GetPatientRecordHistory
    async GetPatientRecordHistory(ctx, patientID) {
        const resultsIterator = await ctx.stub.getHistoryForKey(patientID);
        const results = [];

        for await (const res of resultsIterator) {
            const tx = {
                timestamp: res.timestamp,
                txId: res.txId,
                data: res.value.toString('utf8') ? JSON.parse(res.value.toString('utf8')) : null,
            };
            results.push(tx);
        }
        return JSON.stringify(results);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(ctx, id, newOwner) {
        const assetString = await this.ReadAsset(ctx, id);
        const asset = JSON.parse(assetString);
        const oldOwner = asset.Owner;
        asset.Owner = newOwner;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldOwner;
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = AssetTransfer;
