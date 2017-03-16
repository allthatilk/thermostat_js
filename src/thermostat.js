'use strict';

const MIN_TEMPERATURE = 10
const MAX_STANDARD_TEMP = 32
const MAX_POWERSAVE_TEMP = 25
const BASE_TEMP = 20

function Thermostat() {
  this.temperature = BASE_TEMP;
  this.powerSaving = true;
};

Thermostat.prototype.tempIncrease = function(amount) {
  if (this.powerSaving && this.powerSavingMax(amount)) {
    throw new Error(`Cannot go above ${MAX_POWERSAVE_TEMP} degrees in power-saving mode`)
  }
  else if (this.powerSaving === false && this.standardTempMax(amount)) {
    throw new Error(`Cannot go above ${MAX_STANDARD_TEMP} degrees`)
  }
  this.temperature += amount;
};

Thermostat.prototype.tempDecrease = function(amount) {
  if (this.checkMin(amount)) {
    throw new Error(`Cannot go below ${MIN_TEMPERATURE} degrees`)
  }

  this.temperature -= amount
};

Thermostat.prototype.checkMin = function(amount) {
  if (this.temperature - amount < MIN_TEMPERATURE)
  return true;
};

Thermostat.prototype.powerSavingOff = function() {
  this.powerSaving = false;
};

Thermostat.prototype.powerSavingOn = function() {
  this.powerSaving = true;
};

Thermostat.prototype.powerSavingMax = function(amount) {
  if (this.temperature + amount > 25) {
  return true;
  }
};

Thermostat.prototype.standardTempMax = function(amount) {
  if (this.temperature + amount > 32) {
    return true;
  }
};

Thermostat.prototype.reset = function() {
  this.temperature = BASE_TEMP
}
