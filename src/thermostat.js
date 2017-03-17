'use strict'

// window.onload = function() {
  const MIN_TEMPERATURE = 10
  const MAX_STANDARD_TEMP = 32
  const MAX_POWERSAVE_TEMP = 25
  const BASE_TEMP = 20
  const LOW_USE_LIMIT = 18
  const MED_USE_LIMIT = 25
  const TEMP_INCREMENT_VALUE = 1

  function Thermostat() {
    this.temperature = BASE_TEMP
    this.powerSaving = true
  }

  Thermostat.prototype.tempIncrease = function() {
    if (this.powerSaving && this.powerSavingMax()) {
      throw new Error(
        `Cannot go above ${MAX_POWERSAVE_TEMP} degrees in power-saving mode`
      )
    }
     if (!this.powerSaving && this.standardTempMax()) {
      throw new Error(
        `Cannot go above ${MAX_STANDARD_TEMP} degrees`
      )
    }
    this.temperature += TEMP_INCREMENT_VALUE;
  }

  Thermostat.prototype.tempDecrease = function() {
    if (this.checkMin()) {
      throw new Error(
        `Cannot go below ${MIN_TEMPERATURE} degrees`
      )
    }

    this.temperature -= TEMP_INCREMENT_VALUE
  }

  Thermostat.prototype.checkMin = function() {
    if (this.temperature - TEMP_INCREMENT_VALUE < MIN_TEMPERATURE)
    return true
  }

  Thermostat.prototype.powerSavingOff = function() {
    this.powerSaving = false
  }

  Thermostat.prototype.powerSavingOn = function() {
    this.powerSaving = true
  }

  Thermostat.prototype.powerSavingMax = function() {
    if (this.temperature + TEMP_INCREMENT_VALUE > MAX_POWERSAVE_TEMP) {
    return true
    }
  }

  Thermostat.prototype.standardTempMax = function() {
    if (this.temperature + TEMP_INCREMENT_VALUE > MAX_STANDARD_TEMP) {
      return true
    }
  }

  Thermostat.prototype.reset = function() {
    this.temperature = BASE_TEMP
  }
// Refactor to make cleaner
  Thermostat.prototype.checkUsage = function() {
    if (this.temperature < LOW_USE_LIMIT) {
    return "low-usage"
    }
    if (
      this.temperature < MED_USE_LIMIT && this.temperature >= LOW_USE_LIMIT
    ) {
      return "medium-usage"
    }
    if (this.temperature >= MED_USE_LIMIT) {
      return "high-usage"
    }
  }
// }
