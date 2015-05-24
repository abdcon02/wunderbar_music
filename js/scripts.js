var prox = 0;

//RELAYR STUFF
var relayr = RELAYR.init({
  appId: "a0105207-93f0-4c20-9473-95772fb89ad3"
});
// Relay for proximity, light sensor
relayr.devices().getDeviceData({
    token: "-MT-Hfsw2aiW9eV4xv-QkKCfl8HGNelV",
    deviceId:"13788e39-27f7-4742-8085-87bb04d89438",
    incomingData: function(data){
      prox = data.readings[2].value;
      var prox_output = document.getElementById('prox_sensor');
      prox_output.textContent = prox;

      if(prox > 100) {
        toggleAudio();
      }

    }
});
// Relay for sound sensor
relayr.devices().getDeviceData({
  token: "-MT-Hfsw2aiW9eV4xv-QkKCfl8HGNelV",
  deviceId:"13504694-4cf9-4ba2-8ce6-d5b3a9ef556b",
  incomingData: function(data){
    // console.log("data from device", data)
  }
});

// Relay for gyro sensor
relayr.devices().getDeviceData({
  token: "-MT-Hfsw2aiW9eV4xv-QkKCfl8HGNelV",
  deviceId:"2eb07c01-7579-4316-a2e3-124cad0ec1d3",
  incomingData: function(data){
    var gyro_value = data.readings[0].value.z;
    document.getElementById('volume_level').textContent = audio.volume;

    if (gyro_value > 20 && audio.volume <= 0.7) {
        increaseVolume();
    } else if (gyro_value < -20 && audio.volume >= 0.3) {
        decreaseVolume();
    }
  }
});




//MUSIC STUFF
var audio = new Audio('js/sounds/gameMusic.mp3');
audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

var audio_is_playing = false;

function toggleAudio() {
  if(audio_is_playing) {
    audio.pause();
  }
  else if(!audio_is_playing) {
    audio.play();
  }
  audio_is_playing = !audio_is_playing;
}

function pauseAudio(){
    audio.pause();
};

function playAudio(){
    audio.play();
};

function increaseVolume(){
    audio.volume += 0.2;
}

function decreaseVolume(){
    audio.volume -= 0.2;
}
