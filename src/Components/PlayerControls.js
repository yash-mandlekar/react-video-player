import React, { forwardRef } from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import {
    PauseRounded,
    Settings,
    Fullscreen,
    VolumeOff,
    PlayArrowRounded,
    FastForwardRounded,
    FastRewindRounded,
    VolumeUpRounded,
    VolumeDownRounded,
} from '@mui/icons-material';
import Box from '@mui/material/Box';
import { Button, Grid, Popover } from '@mui/material';

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});
const PlayerControls = forwardRef(({ onPlayPause,
    onPlayBackRateChange,
    playing,
    onRewind,
    onFastForward,
    onMute,
    muted,
    onVolumeChange,
    onVolumeSeekDown,
    volume,
    playbackRate,
    onToggleFullscreen,
    played,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    elapsed,
    remaining,
    onVolumeIncrease,
    onQualityChange
}, ref) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);
    const id = open ? "simple-popover" : undefined;
    const id2 = open2 ? "simple-popover" : undefined;
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    const mainIconColor = theme.palette.mode === 'light' ? '#fff' : '#000';
    const lightIconColor =
        theme.palette.mode === 'light' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
    return (
        <div ref={ref}>
            <Stack spacing={2}>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={played * 100}
                    min={0}
                    step={1}
                    max={100}
                    onChange={onSeek}
                    onMouseDown={onSeekMouseDown}
                    onChangeCommitted={onSeekMouseUp}
                    sx={{
                        color: theme.palette.mode === 'light' ? '#fff' : 'rgba(0,0,0,0.87)',
                        height: 4,
                        width: '98%',
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'light'
                                    ? 'rgb(255 255 255 / 16%)'
                                    : 'rgb(0 0 0 / 16%)'
                                    }`,
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                        mt: -8,
                        ml: 1,
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <TinyText sx={{
                        mt: -2,
                        color: "white",
                        ml: 1,
                    }}>{elapsed}</TinyText>
                    <TinyText sx={{
                        mt: -2,
                        color: "white",
                        mr: 1,
                    }}>/{remaining}</TinyText>
                </Box>
            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: -1,
                }}
            >
                {/* Volume Buttons */}
                <Box sx={{
                    width: '20%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: -4.5,
                    ml: 10,
                }}>
                    <IconButton onClick={onMute} aria-label="volume down">
                        {muted ?
                            <VolumeOff htmlColor={lightIconColor} /> :
                            <VolumeDownRounded htmlColor={lightIconColor} />
                        }
                    </IconButton>
                    <Slider
                        min={0}
                        max={100}
                        value={volume * 100}
                        aria-label="Volume"
                        defaultValue={30}
                        onChange={onVolumeChange}
                        onChangeCommitted={onVolumeSeekDown}
                        sx={{
                            width: '50%',
                            ml: -8,
                            color: theme.palette.mode === 'light' ? '#fff' : 'rgba(0,0,0,0.87)',
                            '& .MuiSlider-track': {
                                border: 'none',
                            },
                            '& .MuiSlider-thumb': {
                                width: 15,
                                height: 15,
                                backgroundColor: '#fff',
                                '&:before': {
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                },
                                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                    boxShadow: 'none',
                                },
                            },
                        }}
                    />
                    <IconButton aria-label="volume up" onClick={onVolumeIncrease} sx={{
                        ml: -8,
                    }}>
                        <VolumeUpRounded htmlColor={lightIconColor} />
                    </IconButton>
                </Box>
                {/* Play and Pause Button */}
                <Box sx={{
                    width: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }} >

                    <IconButton onClick={onRewind} aria-label="previous song">
                        <FastRewindRounded htmlColor={mainIconColor} fontSize="large" />
                    </IconButton>
                    <IconButton
                        aria-label={playing ? 'pause' : 'play'}
                        onClick={onPlayPause}
                    >
                        {playing ? (
                            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                        ) : (
                            <PlayArrowRounded
                                sx={{ fontSize: '3rem' }}
                                htmlColor={mainIconColor}
                            />
                        )}
                    </IconButton>
                    <IconButton onClick={onFastForward} aria-label="next song">
                        <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                </Box>
                <Box sx={{ ml: 1, mt: -5.5 }}>
                    <Grid container alignItems="center" justify="space-between">
                        {/* Setting Button */}
                        <Grid item>
                            <IconButton onClick={handleClick2} aria-label="setting">
                                <Settings htmlColor={mainIconColor} />
                            </IconButton>
                            <Popover
                                open={open2}
                                id={id2}
                                onClose={handleClose2}
                                anchorEl={anchorEl2}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                            >
                                <Grid container direction="column-reverse">
                                    {[144, 240, 360, 480, 720, 1080].map((rate) => (
                                        <Button
                                            key={rate}
                                            //   onClick={() => setState({ ...state, playbackRate: rate })}
                                            onClick={() => onQualityChange(rate)}
                                            variant="text"
                                        >
                                            <Typography
                                                color={rate === playbackRate ? "secondary" : "inherit"}
                                            >
                                                {rate}p
                                            </Typography>
                                        </Button>
                                    ))}
                                </Grid>
                            </Popover>
                        </Grid>
                        {/* PlayBack Rate */}
                        <Grid item>
                            <Typography variant="h6">
                                <Button
                                    onClick={handleClick}
                                    aria-describedby={id}
                                    variant="text"
                                    fontSize="small"
                                >
                                    <Typography>{playbackRate}X</Typography>
                                </Button>
                                <Popover
                                    open={open}
                                    id={id}
                                    onClose={handleClose}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    transformOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                >
                                    <Grid container direction="column-reverse">
                                        {[0.5, 1, 1.5, 2].map((rate) => (
                                            <Button
                                                key={rate}
                                                //   onClick={() => setState({ ...state, playbackRate: rate })}
                                                onClick={() => onPlayBackRateChange(rate)}
                                                variant="text"
                                            >
                                                <Typography
                                                    color={rate === playbackRate ? "secondary" : "inherit"}
                                                >
                                                    {rate}X
                                                </Typography>
                                            </Button>
                                        ))}
                                    </Grid>
                                </Popover>
                            </Typography>
                        </Grid>
                        {/* Full Screen Button */}
                        <Grid item>
                            <Button onClick={onToggleFullscreen}>
                                <Fullscreen />
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div >
    );
});

export default PlayerControls;
