"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const demux_1 = require("demux");
const NodeosBlock_1 = require("./NodeosBlock");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
/**
 * Reads from an EOSIO nodeos node to get blocks of actions.
 * It is important to note that deferred transactions will not be included,
 * as these are currently not accessible without the use of plugins.
 */
class NodeosActionReader extends demux_1.AbstractActionReader {
    constructor(nodeosEndpoint = "http://localhost:8888", startAtBlock = 1, onlyIrreversible = false, maxHistoryLength = 600, requestInstance = request_promise_native_1.default) {
        super(startAtBlock, onlyIrreversible, maxHistoryLength);
        this.startAtBlock = startAtBlock;
        this.onlyIrreversible = onlyIrreversible;
        this.maxHistoryLength = maxHistoryLength;
        this.requestInstance = requestInstance;
        // Remove trailing slashes
        this.nodeosEndpoint = nodeosEndpoint.replace(/\/+$/g, "");
    }
    /**
     * Returns a promise for the head block number.
     */
    getHeadBlockNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            const blockInfo = yield this.httpRequest("get", {
                url: `${this.nodeosEndpoint}/v1/chain/get_info`,
                json: true,
            });
            if (this.onlyIrreversible) {
                return blockInfo.last_irreversible_block_num;
            }
            return blockInfo.head_block_num;
        });
    }
    /**
     * Returns a promise for a `NodeosBlock`.
     */
    getBlock(blockNumber) {
        console.log('here is get block=============>',blockNumber)
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                try {
                    // Query EOSIO API
                    const rawBlock = yield this.httpRequest("post", {
                        url: `${this.nodeosEndpoint}/v1/chain/get_block`,
                        json: { block_num_or_id: blockNumber },
                    });
                    const block = new NodeosBlock_1.NodeosBlock(rawBlock);
                    return block;
                }
                catch (e) {
                    // connection issue
                }
            }
        });
    }
    httpRequest(method, requestParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (method === "get") {
                return yield this.requestInstance.get(requestParams);
            }
            else if (method === "post") {
                return yield this.requestInstance.post(requestParams);
            }
        });
    }
}
exports.NodeosActionReader = NodeosActionReader;
