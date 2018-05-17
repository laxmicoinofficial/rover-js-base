import BigNumber from 'bignumber.js';
import isString from 'lodash/isString';
import {Keypair} from './keypair';
import {StrKey} from "./strkey";

/**
 * Create a new Account object.
 *
 * `Account` represents a single account in Rover network and its sequence number.
 * Account tracks the sequence number as it is used by {@link TransactionBuilder}.
 * See [Accounts](http://www.rover.network/developers/learn/concepts/accounts.html) for more information about how
 * accounts work in Rover.
 * @constructor
 * @param {string} accountId ID of the account (ex. `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`)
 * @param {string} sequence current sequence number of the account
 */
export class Account {
  constructor(accountId, sequence) {
    if (!StrKey.isValidEd25519PublicKey(accountId)) {
      throw new Error('accountId is invalid');
    }
    if (!isString(sequence)) {
      throw new Error('sequence must be of type string');
    }
    this._accountId = accountId;
    this.sequence = new BigNumber(sequence);
  }

  /**
   * Returns Rover account ID, ex. `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`
   * @returns {string}
   */
  accountId() {
    return this._accountId;
  }

  /**
   * @returns {string}
   */
  sequenceNumber() {
    return this.sequence.toString();
  }

  /**
   * Increments sequence number in this object by one.
   */
  incrementSequenceNumber() {
    this.sequence = this.sequence.add(1);
  }
}