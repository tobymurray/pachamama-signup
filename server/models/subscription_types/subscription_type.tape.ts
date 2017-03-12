const test = require('blue-tape');
const mockKnex = require('mock-knex');

import { CryptoUtils } from '../../utils/cryptoUtils';
import { SubscriptionType } from './subscription_type';
import { Database } from '../../database/db_config';
if (!(<any>global).knex) {
  (<any>global).knex = mockKnex.mock(Database.get());
}

test('SubscriptionType', d => {

  d.test('is constructable without ID', t => {
    t.doesNotThrow(() => {
      new SubscriptionType("description");
    });
    t.end();
  });

  d.test('is constructable with ID', t => {
    t.doesNotThrow(() => {
      new SubscriptionType("description", 1);
    });
    t.end();
  });
  d.end();

});