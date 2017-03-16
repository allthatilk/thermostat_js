'use strict';

describe("Thermostat", function() {
  var thermo = new Thermostat();

  beforeEach(function() {
    thermo = new Thermostat();
  });

  describe("temperature", function() {
    it("default is set at 20 degrees", function() {
      expect(thermo.temperature).toEqual(20);
    });
    it("goes up", function() {
      thermo.tempIncrease(5);
      expect(thermo.temperature).toEqual(25);
    });
    it("goes down", function() {
      thermo.tempDecrease(10);
      expect(thermo.temperature).toEqual(10);
    });
    it("doesn't go below 10 degrees", function() {
      expect(function() {
        thermo.tempDecrease(11)
      }).toThrowError("Cannot go below 10 degrees")
    });
    it("can be reset to 20 degrees", function() {
      thermo.reset()
      expect(thermo.temperature).toEqual(20);
    })
  });

  describe("power-saving mode", function() {
    it("can turn power-saving mode off", function() {
      console.log(thermo);
      thermo.powerSavingOff();
      expect(thermo.powerSaving).toEqual(false);
    });

    it("can turn power-saving mode on", function() {
      thermo.powerSaving = false;
      console.log(thermo);
      thermo.powerSavingOn();
      expect(thermo.powerSaving).toEqual(true);
    });

    it("sets the max temp to 25 for power-saving", function() {
      expect(function() {
        thermo.tempIncrease(6)
      }).toThrowError("Cannot go above 25 degrees in power-saving mode")
    });

    it("sets the max temp to 32 when power-saving is off", function() {
      thermo.powerSavingOff();
      expect(function() {
        thermo.tempIncrease(16)
      }).toThrowError("Cannot go above 32 degrees")
    });
  });

  describe("energy usage reporting", function() {
    it("shows low-usage when temperature < 18 degrees", function() {
      thermo.temperature = 16
      expect(thermo.checkUsage()).
      toEqual("low-usage")
    })

    it("shows medium-usage when temperature < 25 but at least 18 degrees", function() {
      expect(thermo.checkUsage()).
      toEqual("medium-usage")
    })

    it("shows high-usage when temperature >= 25 degrees", function() {
      thermo.temperature = 27
      expect(thermo.checkUsage()).
      toEqual("high-usage")
    })
  })
});
