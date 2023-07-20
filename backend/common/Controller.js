/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 13/07/2023
*/

const {DataModel} = require("./db");
const {success, sequelizeError, error} = require("./Response");
const {buildPageResult} = require("./middleware/PageResultBuilder");
const {buildCondition} = require("./middleware/ConditionBuilder");
const {DEFAULT_ACTIVE_LISTING} = require("./config");

class Controller{

    defaultModel = DataModel;

    listSerializer = null;
    detailSerializer = null;

    static listPayload = {};
    static createPayload = {};
    static updatePayload = {};

    create(req, res, successCallback = null){
        this.defaultModel.create(req.body).then(async (item) => {
            if(successCallback !== null && successCallback.toString().indexOf('function next(') !== 0) await successCallback(item);
            return (typeof item.id === 'undefined') ? success(res, item) : this._get(req, res, item.id);
        }).catch((error) => {
            return sequelizeError(res, error);
        });
    }

    list(req, res){
        let search = {
            ...buildCondition(req),
            order: (Object.keys(this.defaultModel.attributes).includes('id')) ? [['id', 'ASC']] : [],
            ...this.listSerializer
        };

        if(typeof this.defaultModel.attributes.active !== 'undefined' && typeof search.where.active === 'undefined' && DEFAULT_ACTIVE_LISTING === true){
            search.where.active = true;
        }

        this.defaultModel.list(search).then((items) => {
            return success(res, buildPageResult(items, req));
        }).catch((error) => {
            return sequelizeError(res, error);
        });
    }

    doRefactors(item){
        for (let [key, value] of Object.entries(item)) {
            if(typeof value === 'object' && value !== null){
                value = this.doRefactors(value);
            }
            if(key.substring(0, 3) === '$__'){
                if(typeof item[key.substring(3)] !== 'undefined'){
                    item[key.substring(3)] = value;
                    delete item[key];
                }
            }
            if(key.substring(0, 3) === '___'){
                if(typeof item[key.substring(3) + 'Id'] !== 'undefined'){
                    if(typeof value === 'object') {
                        for (const [__key, __value] of Object.entries(value)) {
                            item[__key] = __value;
                        }
                    }else{
                        item[key.substring(3)] = value;
                    }
                    delete item[key];
                    delete item[key.substring(3) + 'Id'];
                }
            }
        }
        return item;
    }

    _get(req, res, id){
        this.defaultModel.get(id, this.detailSerializer).then((item) => {
            if(item === null){
                return error(res, `Data not found with id: ${id}`);
            }
            item = item.toJSON();
            item = this.doRefactors(item);
            return success(res, item);
        }).catch((error) => {
            return sequelizeError(res, error);
        });
    }

    get(req, res){
        return this._get(req, res, req.params.id);
    }

    update(req, res, successCallback = null){
        this.defaultModel.get(req.params.id).then(async (item) => {
            this.defaultModel.update(item, req.body).then(async (item) => {
                if(successCallback !== null && successCallback.toString().indexOf('function next(') !== 0) await successCallback(item);
                return (typeof item.id === 'undefined') ? success(res, item) : this._get(req, res, item.id);
            }).catch((error) => {
                return sequelizeError(res, error);
            });

        }).catch((error) => {
            return sequelizeError(res, error);
        });
    }

    delete(req, res){
        this.defaultModel.get(req.params.id).then((item) => {

            this.defaultModel.delete(item, req.body).then((item) => {
                return success(res, []);
            }).catch((error) => {
                return sequelizeError(res, error);
            });

        }).catch((error) => {
            return sequelizeError(res, error);
        });
    }

    static sef_link(string){
        return string.toString()               // Convert to string
            .normalize('NFD')               // Change diacritics
            .replace(/[\u0300-\u036f]/g,'') // Remove illegal characters
            .replace(/\s+/g,'-')            // Change whitespace to dashes
            .toLowerCase()                  // Change to lowercase
            .replace(/&/g,'-and-')          // Replace ampersand
            .replace(/[^a-z0-9\-]/g,'')     // Remove anything that is not a letter, number or dash
            .replace(/-+/g,'-')             // Remove duplicate dashes
            .replace(/^-*/,'')              // Remove starting dashes
            .replace(/-*$/,'');             // Remove trailing dashes
    }
}

module.exports = Controller;
