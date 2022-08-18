import { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import screenfull from 'screenfull';
import ReactPlayer from 'react-player';
import PlayerControls from './Components/PlayerControls';

const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});


const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 800,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));
let count = 0;

export default function App() {
  const PlayerRef = useRef();
  const PlayerContainerRef = useRef();
  const ControlsRef = useRef();
  const [state, setstate] = useState({
    playing: false,
    muted: false,
    volume: 0.3,
    playbackRate: 1,
    played: 0,
    seeking: false,
  });
  const { playing, muted, volume, playbackRate, played, seeking } = state;
  const handlePlayPause = () => {
    setstate({
      ...state,
      playing: !playing
    });
  }
  const handleRewind = () => {
    PlayerRef.current.seekTo(PlayerRef.current.getCurrentTime() - 10);
  }
  const handleFastForward = () => {
    PlayerRef.current.seekTo(PlayerRef.current.getCurrentTime() + 10);
  }
  const handleMute = () => {
    setstate({
      ...state,
      muted: !muted
    });
  }
  const handleVolumeChange = (e, newVolume) => {
    setstate({
      ...state,
      volume: +newVolume / 100,
      muted: newVolume === 0,
    });
  }
  const handleVolumeSeekDown = (e, newVolume) => {
    setstate({
      ...state,
      volume: +newVolume / 100,
      muted: newVolume === 0,
    });
  }
  const handlePlaybackRateChange = (Rate) => {
    setstate({
      ...state,
      playbackRate: +Rate,
    });
  }
  const handleToggleFullscreen = () => {
    if (screenfull.isFullscreen) {
      screenfull.exit();
    } else {
      screenfull.toggle(PlayerContainerRef.current);
    }
  }
  const handleProgress = (progress) => {
    if (!seeking) {
      setstate({
        ...state,
        played: progress.played,
      });
    }
    if (count > 3) {
      ControlsRef.current.style.visibility = 'hidden'
      count = 0;
    }
    if (ControlsRef.current.style.visibility === 'visible') {
      count++;
    }
  }
  const handleOnSeek = (e, newTime) => {
    setstate({
      ...state,
      played: +newTime / 100,
    });
  }
  const handleOnSeekMouseDown = (e, newTime) => {
    setstate({
      ...state,
      seeking: true,
    });
  }
  const handleOnSeekMouseUp = (e, newTime) => {
    setstate({
      ...state,
      seeking: false,
    });
    PlayerRef.current.seekTo(+newTime / 100);
  }
  const format = (seconds) => {
    if (isNaN(seconds)) {
      return '00:00';
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, "0")
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss} `
    }
    return `${mm}:${ss}`;
  }
  const handleVolumeIncrease = () => {
    setstate({
      ...state,
      volume: volume + 0.1,
    });
  }
  const handleVolumeDecrease = () => {
    setstate({
      ...state,
      volume: volume - 0.1,
    });
  }
  const keydown = (e) => {
    if (e.keyCode === 32) {
      handlePlayPause();
    }
    if (e.keyCode === 37) {
      handleRewind();
    }
    if (e.keyCode === 39) {
      handleFastForward();
    }
    if (e.keyCode === 38) {
      handleVolumeIncrease();
    }
    if (e.keyCode === 40) {
      handleVolumeDecrease();
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('keydown', keydown);
    };
  }, []);
  const handleMouseMove = (e) => {
    ControlsRef.current.style.visibility = 'visible';
    count = 0;
  }
  const handleQualityChange = (e) => {
    let url = PlayerRef.current.getInternalPlayer().src.split('/')
    url.splice(url.length - 1, 1)
    url.push(`${e}`)
    let url2 = url.join('/')
    PlayerRef.current.getInternalPlayer().src = url2
  }
  const currentTime = PlayerRef.current ? PlayerRef.current.getCurrentTime() : "00:00"
  const duration = PlayerRef.current ? PlayerRef.current.getDuration() : "00:00"
  const elapsed = format(currentTime)
  const totalDuration = format(duration)
  const remaining = format(duration - currentTime)
  // console.log(state);
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }} keydown={keydown}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <div ref={PlayerContainerRef} className="player-wrapper" onClick={handlePlayPause} onDoubleClick={handleToggleFullscreen} onMouseMove={handleMouseMove}>
            <ReactPlayer
              // url={`http://localhost:4000/watch/62fce018ee5d668f4154a926/720`}
              url="http://localhost:4000/watch/62fe1affbd4c86c777fc8176/1080"
              height='100%'
              width='100%'
              muted={muted}
              playing={playing}
              ref={PlayerRef}
              volume={volume}
              playbackRate={playbackRate}
              onProgress={handleProgress}
            />
          </div>
        </Box>
        <PlayerControls
          ref={ControlsRef}
          onPlayPause={handlePlayPause}
          playing={playing}
          onRewind={handleRewind}
          onFastForward={handleFastForward}
          muted={muted}
          onMute={handleMute}
          onVolumeSeekDown={handleVolumeSeekDown}
          onVolumeChange={handleVolumeChange}
          volume={volume}
          playbackRate={playbackRate}
          onPlayBackRateChange={handlePlaybackRateChange}
          onPlaybackRate={handlePlaybackRateChange}
          onToggleFullscreen={handleToggleFullscreen}
          played={played}
          onSeek={handleOnSeek}
          onSeekMouseDown={handleOnSeekMouseDown}
          onSeekMouseUp={handleOnSeekMouseUp}
          elapsed={elapsed}
          totalDuration={totalDuration}
          remaining={remaining}
          onVolumeIncrease={handleVolumeIncrease}
          onQualityChange={handleQualityChange}
        />
      </Widget>
      <WallPaper />
    </Box>
  );
}
