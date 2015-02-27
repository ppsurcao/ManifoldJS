'use strict';

var transformation = require('../../lib/transformations/w3c');
var should = require('should');

describe('transformation: W3C Manifest', function () {
  describe('convertToBase()', function () {
    it('Should return an Error in callback if manifestInfo is undefined', function(done) {
      var originalManifest;

      transformation.convertToBase(originalManifest, function(err){
        should.exist(err);
        err.should.have.property('message', 'Manifest content is empty or not initialized.');
        done();
      });
    });

    it('Should return an Error in callback if manifestInfo does not contains content property', function(done) {
      var originalManifest = { key: 'value' };

      transformation.convertToBase(originalManifest, function(err) {
        should.exist(err);
        err.should.have.property('message', 'Manifest content is empty or not initialized.');
        done();
      });
    });

    it('Should return the same object and no error', function (done) {
      var originalManifest = {
        content: {
          'start_url' : 'url'
        }
      };

      transformation.convertToBase(originalManifest, function(err, result) {
        should.not.exist(err);
        result.should.be.exactly(originalManifest);
        done();
      });
    });
  });

  describe('convertFromBase()', function () {
    it('Should return an Error in callback if manifestInfo is undefined', function(done) {
      var originalManifest;

      transformation.convertFromBase(originalManifest, function(err) {
        should.exist(err);
        err.should.have.property('message', 'Manifest content is empty or not initialized.');
        done();
      });
    });

    it('Should return an Error in callback if manifestInfo does not contains content property', function(done) {
      var originalManifest = { key: 'value' };

      transformation.convertFromBase(originalManifest, function(err) {
        should.exist(err);
        err.should.have.property('message', 'Manifest content is empty or not initialized.');
        done();
      });
    });

    it('Should return the same object and no error', function (done) {
      var originalManifest = {
        content: {
          'start_url' : 'url'
        }
      };

      transformation.convertFromBase(originalManifest, function(err, result) {
        should.not.exist(err);
        result.should.be.exactly(originalManifest);
        done();
      });
    });
  });

  describe('matchFormat()', function () {
    it('Should return true if manifestObj is a empty object', function() {
      var manifestObj = {};

      var result = transformation.matchFormat(manifestObj);
      should.exist(result);
      /*jshint -W030 */
      result.should.be.true;
    });

    it('Should return true if manifestObj is a valid W3C manifest', function() {
      var manifestObj ={
        'start_url': 'url',
        'name': 'test'
      };

      var result = transformation.matchFormat(manifestObj);
      should.exist(result);
      /*jshint -W030 */
      result.should.be.true;
    });

    it('Should return true if manifestObj is a valid W3C manifest with extensions', function() {
      var manifestObj = {
        'start_url': 'url',
        'name': 'test',
        'extension_test': 'test',
        'extension_obj': { 'key': 'value' }
      };

      var result = transformation.matchFormat(manifestObj);
      should.exist(result);
      /*jshint -W030 */
      result.should.be.true;
    });

    it('Should return false if manifestObj is an invalid W3C manifest', function() {
      var manifestObj = {
        'start_url': 'url',
        'name': 'test',
        'invalid': 'test'
      };

      var result = transformation.matchFormat(manifestObj);
      should.exist(result);
      /*jshint -W030 */
      result.should.be.false;
    });

    it('Should return true if manifestObj is an valid W3C manifest with icons', function() {
      var manifestObj = {
        'start_url': 'url',
        'name': 'test',
        'icons': [{
          'src': 'icon/lowres',
          'sizes': '64x64',
          'type': 'image/webp'
        }]
      };

      var result = transformation.matchFormat(manifestObj);
      should.exist(result);
      /*jshint -W030 */
      result.should.be.true;
    });

    it('Should return false if manifestInfo is an invalid W3C manifest with invalid icons', function() {
      var manifestObj = {
        'start_url': 'url',
        'name': 'test',
        'icons': [{
          'src': 'icon/lowres',
          'invalid': 'test',
          'type': 'image/webp'
        }]
      };

      var result = transformation.matchFormat(manifestObj);
      should.exist(result);
      /*jshint -W030 */
      result.should.be.false;
    });
  });
});