'use strict';

const angular = require('angular');
require('angular-mocks');
require('../app/js/client.js');

describe('plants controller tests', () => {
  let plantsctrl;
  let $httpBackend;

  beforeEach(() => {
    angular.mock.module('HealthApp');
    angular.mock.inject(function($controller, _$httpBackend_){
      plantsctrl = new $controller('PlantsController');
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a plants array', () => {
    expect(Array.isArray(plantsctrl.plants)).toBe(true);
  });

  it('should get a list of plants', () => {
    $httpBackend.expectGET('http://localhost:3000/plants')
      .respond(200, {commonName: 'test', scientificName: 'test', medicinalUses: ['test'], nutritionalValue: ['test'], zone: 0});

    plantsctrl.getPlants();
    $httpBackend.flush();
    expect(plantsctrl.plants.commonName).toBe('test');
    expect(plantsctrl.plants.scientificName).toBe('test');
    expect(plantsctrl.plants.medicinalUses[0]).toBe('test');
    expect(plantsctrl.plants.nutritionalValue[0]).toBe('test');
    expect(plantsctrl.plants.zone).toBe(0);
  });

  it('should add a plant', () => {
    $httpBackend.expectPOST('http://localhost:3000/plants')
      .respond(200, {commonName: 'test', scientificName: 'test', medicinalUses: ['test'], nutritionalValue: ['test'], zone: 0});

    plantsctrl.newPlant = {commonName: 'test', scientificName: 'test', medicinalUses: ['test'], nutritionalValue: ['test'], zone: 0};
    plantsctrl.addPlant();
    $httpBackend.flush();
    expect(plantsctrl.newPlant).toBe(null);
  });

  it('should delete a plant', () => {
    let testPlant = {_id: 1, commonName: 'test', scientificName: 'test', medicinalUses: ['test'], nutritionalValue: ['test'], zone: 0};
    $httpBackend.expectDELETE('http://localhost:3000/plants/1')
      .respond(200, {message: 'deleted'});

    plantsctrl.plants.push(testPlant);
    plantsctrl.deletePlant(testPlant);
    $httpBackend.flush();
    expect(plantsctrl.plants.length).toBe(0);
  });

  it('should update a plant', () => {
    let testPlant = {_id: 1, commonName: 'test', scientificName: 'test', medicinalUses: ['test', 'test'], nutritionalValue: ['test', 'test'], zone: 0};
    let updatedPlant = {_id: 1, commonName: 'test2', scientificName: 'test', medicinalUses: 'test, test', nutritionalValue: 'test', zone: 2};
    $httpBackend.expectPUT('http://localhost:3000/plants')
      .respond(200, {message: 'updated'});

    plantsctrl.plants.push(testPlant);
    plantsctrl.updatePlant(testPlant, updatedPlant);
    $httpBackend.flush();
    expect(plantsctrl.plants.length).toBe(1);
    expect(plantsctrl.plants[0].commonName).toBe('test2');
    expect(plantsctrl.plants[0].scientificName).toBe('test');
    expect(plantsctrl.plants[0].medicinalUses[0]).toBe('test');
    expect(plantsctrl.plants[0].nutritionalValue[0]).toBe('test');
    expect(plantsctrl.plants[0].zone).toBe(2);
  });
});

describe('supplement controller tests', () => {
  let supplementsctrl;
  let $httpBackend;

  beforeEach(() => {
    angular.mock.module('HealthApp');
    angular.mock.inject(function($controller, _$httpBackend_){
      supplementsctrl = new $controller('SupplementsController');
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a supplements array', () => {
    expect(Array.isArray(supplementsctrl.supplements)).toBe(true);
  });

  it('should get a list of supplements', () => {
    $httpBackend.expectGET('http://localhost:3000/supplements')
      .respond(200, {name: 'test', medicinalEffects: ['test'], sideEffects: ['test']});

    supplementsctrl.getSupplements();
    $httpBackend.flush();
    expect(supplementsctrl.supplements.name).toBe('test');
    expect(supplementsctrl.supplements.medicinalEffects[0]).toBe('test');
    expect(supplementsctrl.supplements.sideEffects[0]).toBe('test');
  });

  it('should add a supplement', () => {
    $httpBackend.expectPOST('http://localhost:3000/supplements')
      .respond(200, {name: 'test', medicinalEffects: ['test'], sideEffects: ['test']});

    supplementsctrl.newSupplement = {name: 'test', medicinalEffects: ['test'], sideEffects: ['test']};
    supplementsctrl.addSupplement();
    $httpBackend.flush();
    expect(supplementsctrl.newSupplement).toBe(null);
  });

  it('should delete a supplement', () => {
    let testSupplement = {_id: 1, name: 'test', medicinalEffects: ['test'], sideEffects: ['test']};
    $httpBackend.expectDELETE('http://localhost:3000/supplements/1')
      .respond(200, {message: 'deleted'});

    supplementsctrl.supplements.push(testSupplement);
    supplementsctrl.deleteSupplement(testSupplement);
    $httpBackend.flush();
    expect(supplementsctrl.supplements.length).toBe(0);
  });

  it('should update a supplement', () => {
    let testSupplement = {_id: 1, name: 'test', medicinalEffects: ['test'], sideEffects: ['test']};
    let updatedSupplement = {_id: 1, name: 'test2', medicinalEffects: 'test2', sideEffects: 'test'};
    $httpBackend.expectPUT('http://localhost:3000/supplements')
      .respond(200, {message: 'updated'});

    supplementsctrl.supplements.push(testSupplement);
    supplementsctrl.updateSupplement(testSupplement, updatedSupplement);
    $httpBackend.flush();
    expect(supplementsctrl.supplements.length).toBe(1);
    expect(supplementsctrl.supplements[0].name).toBe('test2');
    expect(supplementsctrl.supplements[0].medicinalEffects[0]).toBe('test2');
    expect(supplementsctrl.supplements[0].sideEffects[0]).toBe('test');
  });
});
