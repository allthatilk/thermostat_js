$(document).ready(function() {
  var thermius = new Thermostat()
  temperatureReport()
  powerSaveDisplay()

  $('#select-city').submit(function(event) {
    event.preventDefault()
    var city = $('#current-city').val()
    displayWeather(city)
  })

  $('#tempIncrease').click(function () {
    thermius.tempIncrease()
    temperatureReport()
  })

  $('#tempDecrease').click(function () {
    thermius.tempDecrease()
    temperatureReport()
  })

  $('#powerSavingOn').click(function () {
    thermius.powerSavingOn()
    powerSaveDisplay()
    temperatureReport()
  })

  $('#powerSavingOff').click(function () {
    thermius.powerSavingOff()
    powerSaveDisplay()
    temperatureReport()
  })

  $('#reset').click(function () {
    thermius.reset()
    temperatureReport()
  })

  $('#checkUsage').click(function () {
    thermius.checkUsage()
    temperatureReport()
  })

  function temperatureReport() {
    $('#temperature').text(thermius.temperature)
    $('#temperature').attr('class', thermius.checkUsage())
  }

  function powerSaveDisplay() {
    if (thermius.powerSaving) {
      $('#powerSaving').text('On')
    }
    else {
      $('#powerSaving').text('Off')
    }
  }

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city
    var token = '&appid=28ace10c71acd43e2ded0d44688c1b82'
    var units = '&units=metric'
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp)
    })
  }
})
