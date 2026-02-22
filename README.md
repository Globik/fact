# fact
Chatik


``` 
start sound
gst-launch-1.0 \
  alsasrc device="hw:1,0" ! \
    queue max-size-time=20000000 ! \
    audioconvert ! \
    audioresample ! \
    audio/x-raw,channels=1,rate=16000 ! \
         opusenc bitrate=20000 ! \
   rtpopuspay ! \
     udpsink host=127.0.0.1 port=9000
     
     gst-launch-1.0 \
     
     
     
     gst-launch-1.0 \
   libcamerasrc ! queue ! capsfilter caps=video/x-raw,width=820,height=400,format=NV12,interface-mode=progressive ! \
  v4l2h264enc extra-controls="controls,repeat_sequence_header=1"  ! \
  'video/x-h264,level=(string)4' ! h264parse ! queue ! rtph264pay pt=96 ! udpsink host=5.35.88.151 port=5000 \
  alsasrc device="hw:3,0" ! \
    queue max-size-time=20000000 ! \
    audioconvert ! \
    audioresample ! \
    audio/x-raw,channels=1,rate=16000 ! \
         opusenc bitrate=20000 ! \
   rtpopuspay ! \
     udpsink host=5.35.88.151 port=9000
     
     check stream
     
     gst-launch-1.0 udpsrc port=9000 caps="application/x-rtp, media=audio, encoding-name=OPUS, clock-rate=48000, payload=96" ! \
  rtpopusdepay ! opusdec ! \
  queue ! \
  autoaudiosink
  
  
  gst-launch-1.0 -v \
  udpsrc port=5000 caps="application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96" ! \
  rtph264depay ! \
  avdec_h264 ! \
  autovideosink

```
