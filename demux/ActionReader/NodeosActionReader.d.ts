import { AbstractActionReader } from "demux";
import { NodeosBlock } from "./NodeosBlock";
/**
 * Reads from an EOSIO nodeos node to get blocks of actions.
 * It is important to note that deferred transactions will not be included,
 * as these are currently not accessible without the use of plugins.
 */
export declare class NodeosActionReader extends AbstractActionReader {
    startAtBlock: number;
    protected onlyIrreversible: boolean;
    protected maxHistoryLength: number;
    protected requestInstance: any;
    protected nodeosEndpoint: string;
    constructor(nodeosEndpoint?: string, startAtBlock?: number, onlyIrreversible?: boolean, maxHistoryLength?: number, requestInstance?: any);
    /**
     * Returns a promise for the head block number.
     */
    getHeadBlockNumber(): Promise<number>;
    /**
     * Returns a promise for a `NodeosBlock`.
     */
    getBlock(blockNumber: number): Promise<NodeosBlock>;
    protected httpRequest(method: string, requestParams: any): Promise<any>;
}
