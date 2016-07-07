'use strict';

const angular = require('angular');
require('angular-mocks');
require('../app/js/client.js');

const formTemplate = require('../app/templates/form.html');
const itemTemplate = require('../app/templates/item.html');
const listTemplate = require('../app/templates/list.html');

describe('plants controller tests', () => {
  let rctrl;
  let $httpBackend;

  beforeEach(() => {
    angular.mock.module('HealthApp');
    angular.mock.inject(function($controller, _$httpBackend_){
      rctrl = new $controller('ResourceController');
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a resouces arrays', () => {
    expect(Array.isArray(rctrl.plants)).toBe(true);
    expect(Array.isArray(rctrl.supplements)).toBe(true);
  });

  it('should get a list of plants', () => {
    $httpBackend.expectGET('http://localhost:3000/plants')
      .respond(200, {commonName: 'test', scientificName: 'test', medicinalUses: ['test'], nutritionalValue: ['test'], zone: 0});

    rctrl.getPlants();
    $httpBackend.flush();
    expect(rctrl.plants.commonName).toBe('test');
    expect(rctrl.plants.scientificName).toBe('test');
    expect(rctrl.plants.medicinalUses[0]).toBe('test');
    expect(rctrl.plants.nutritionalValue[0]).toBe('test');
    expect(rctrl.plants.zone).toBe(0);
  });

  it('should get a list of supplements', () => {
    $httpBackend.expectGET('http://localhost:3000/supplements')
      .respond(200, {name: 'test', medicinalEffects: ['test'], sideEffects: ['test']});

    rctrl.getSupplements();
    $httpBackend.flush();
    expect(rctrl.supplements.name).toBe('test');
    expect(rctrl.supplements.medicinalEffects[0]).toBe('test');
    expect(rctrl.supplements.sideEffects[0]).toBe('test');
  });

  it('should add a plant', () => {
    $httpBackend.expectPOST('http://localhost:3000/plants')
      .respond(200, {commonName: 'test', scientificName: 'test', medicinalUses: ['test'], nutritionalValue: ['test'], zone: 0});

    rctrl.updated = {commonName: 'test', scientificName: 'test', medicinalUses: ['test'], nutritionalValue: ['test'], zone: 0};
    rctrl.addPlant();
    $httpBackend.flush();
    expect(rctrl.updated).toEqual({});
  });

  it('should add a supplement', () => {
    $httpBackend.expectPOST('http://localhost:3000/supplements')
      .respond(200, {name: 'test', medicinalEffects: ['test'], sideEffects: ['test']});

    rctrl.updated = {name: 'test', medicinalEffects: ['test'], sideEffects: ['test']};
    rctrl.addSupplement();
    $httpBackend.flush();
    expect(rctrl.updated).toEqual({});
  });

  it('should delete a plant', () => {
    let testPlant = {_id: 1, commonName: 'test', scientificName: 'test', medicinalUses: ['test'], nutritionalValue: ['test'], zone: 0};
    $httpBackend.expectDELETE('http://localhost:3000/plants/1')
      .respond(200, {message: 'deleted'});

    rctrl.plants.push(testPlant);
    rctrl.deletePlant(testPlant);
    $httpBackend.flush();
    expect(rctrl.plants.length).toBe(0);
  });

  it('should delete a supplement', () => {
    let testSupplement = {_id: 1, name: 'test', medicinalEffects: ['test'], sideEffects: ['test']};
    $httpBackend.expectDELETE('http://localhost:3000/supplements/1')
      .respond(200, {message: 'deleted'});

    rctrl.supplements.push(testSupplement);
    rctrl.deleteSupplement(testSupplement);
    $httpBackend.flush();
    expect(rctrl.supplements.length).toBe(0);
  });

  it('should update a plant', () => {
    let testPlant = {_id: 1, commonName: 'test', scientificName: 'test', medicinalUses: ['test', 'test'], nutritionalValue: ['test', 'test'], zone: 0};
    let updatedPlant = {_id: 1, commonName: 'test2', scientificName: 'test', medicinalUses: 'test, test', nutritionalValue: 'test', zone: 2};
    $httpBackend.expectPUT('http://localhost:3000/plants')
      .respond(200, {message: 'updated'});

    rctrl.currentresource = testPlant;
    rctrl.plants.push(testPlant);
    rctrl.updatePlant(updatedPlant);
    $httpBackend.flush();
    expect(rctrl.plants.length).toBe(1);
    expect(rctrl.plants[0].commonName).toBe('test2');
    expect(rctrl.plants[0].scientificName).toBe('test');
    expect(rctrl.plants[0].medicinalUses[0]).toBe('test');
    expect(rctrl.plants[0].nutritionalValue[0]).toBe('test');
    expect(rctrl.plants[0].zone).toBe(2);
  });

  it('should update a supplement', () => {
    let testSupplement = {_id: 1, name: 'test', medicinalEffects: ['test'], sideEffects: ['test']};
    let updatedSupplement = {_id: 1, name: 'test2', medicinalEffects: 'test2', sideEffects: 'test'};
    $httpBackend.expectPUT('http://localhost:3000/supplements')
      .respond(200, {message: 'updated'});

    rctrl.currentresource = testSupplement;
    rctrl.supplements.push(testSupplement);
    rctrl.updateSupplement(updatedSupplement);
    $httpBackend.flush();
    expect(rctrl.supplements.length).toBe(1);
    expect(rctrl.supplements[0].name).toBe('test2');
    expect(rctrl.supplements[0].medicinalEffects[0]).toBe('test2');
    expect(rctrl.supplements[0].sideEffects[0]).toBe('test');
  });
});

describe('directive tests', () => {
  let $httpBackend;
  let $scope;
  let $compile;

  beforeEach(() => {
    angular.mock.module('HealthApp');
    angular.mock.inject(function(_$httpBackend_, $rootScope, _$compile_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
      $httpBackend = _$httpBackend_;
    });
  });

  it('should have list the common name of resources', () => {
    $httpBackend.expectGET('./templates/list.html')
      .respond(200, listTemplate);

    $scope.resource = {commonName: 'test'};
    let element = angular.element('<list-directive resource="resource"></list-directive>');
    element.data('$ngControllerController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let textElement = directive.find('p')[1];
    let text = textElement.innerText;
    expect(text).toBe('test');
  });

  it('should only list the relevant resource', () => {
    $httpBackend.expectGET('./templates/list.html')
      .respond(200, listTemplate);

    $scope.resource = {commonName: 'test'};
    let element = angular.element('<list-directive resource="resource"></list-directive>');
    element.data('$ngControllerController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let hiddenResource = directive.find('.ng-hide');
    expect(hiddenResource);
  });

  it('should show resource attributes on the item view', () => {
    $httpBackend.expectGET('./templates/item.html')
      .respond(200, itemTemplate);

    $scope.resource = {commonName: 'test', scientificName: 'testScience', medicinalUses: ['test'], nutritionalValue: ['test'], zone: 0};
    let element = angular.element('<item-directive currentresource="resource" plant="plant"></item-directive>');
    element.data('$ngControllerController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let listItems = directive.find('li');
    expect(listItems.length).toBe(5);
  });

  it('should have forms to add and update resources', () => {
    $httpBackend.expectGET('./templates/form.html')
      .respond(200, formTemplate);
    $scope.resource = {commonName: 'test', scientificName: 'testScience', medicinalUses: ['test'], nutritionalValue: ['test'], zone: 0};
    let element = angular.element('<form-directive resource="plant" currentresource="resource"></form-directive>');
    element.data('$ngControllerController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let inputs = directive.find('input');
    expect(inputs.length).toBe(5);
  });
});
