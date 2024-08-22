import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ReactHtmlParser from "react-html-parser"
import ClickAwayListener from '@mui/material/ClickAwayListener';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Router from "next/router"
import { Divider, Stack } from '@mui/material';
import { Close, ErrorOutlineOutlined } from '@mui/icons-material';



const HtmlTooltip = styled(({ className, handleTooltipClose, open, ...props }) => (
    <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
            <Tooltip arrow PopperProps={{ disablePortal: true, }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener placement="right" {...props} classes={{ popper: className }} />
        </div></ClickAwayListener>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: '100%',
        padding: '0',
        border: '2px solid black',
        fontFamily: "Lato, Droid Sans, Helvetica Neue, sans-serif !important"
    },
}));

export default function CustomizedTooltips({ name }) {
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const loadInvasivePlantList = async () => {
          Router.push({
            pathname: "/conservationRankDetails",
            query: { keyword: 'Invasive' },
          }).then(() => {
          })
      }
    return (
        <>
            {name === 'inflorescence' ?
                <HtmlTooltip
                    handleTooltipClose={handleTooltipClose}
                    open={open}
                    title={
                        <React.Fragment>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <h5 className="modal-title" id="exampleModalLabel" style={{ fontSize: '17px' }}>
                                    Flower Arrangement (Inflorescence)
                                </h5>
                                <IconButton aria-label="close" onClick={handleTooltipClose}>
                                    <Close />
                                </IconButton>
                            </Stack>
                            <Divider sx={{ mb: '10px' }} />
                            <FormGroup>
                                <FormControlLabel sx={{ fontSize: '9px' }} control={<Checkbox color="success" defaultChecked size="small" sx={{ fontSize: '9px' }} />} label={ReactHtmlParser(`<span class='labelDesc'><b>Cyme: </b><span class='labelDesc'>flattish topped flower arrangement with stalked flower rising from one point of a common stalk; the inner flowers bloom first</span></span>  <img src='/images/flower.png' style={{border:'1px solid grey'}} height='30' width='30'></img>`)} />
                                <FormControlLabel control={<Checkbox color="success" size="small" />} sx={{ fontSize: '12px' }} label={ReactHtmlParser("<span class='labelDesc'><b>Panicle:  </b><span class='labelDesc'>loose irregular arrangement of stalked flowers; each branch has multiple stalked flowers; a panicle is made up of multiple racemes </span></span>  <img src='/images/leaf.png' style={{border:'1px solid grey'}} height='30' width='30'></img>")} />
                                <FormControlLabel control={<Checkbox color="success" size="small" />} sx={{ fontSize: '12px' }} label={ReactHtmlParser("<span class='labelDesc'><b>Raceme: </b> <span class='labelDesc'>flower arrangement where each flower is on an individual stalk along a central stem; a panicle includes multiple racemes</span></span>   <img src='/images/leaf.png' style={{border:'1px solid grey'}} height='30' width='30'></img>")} />
                                <FormControlLabel control={<Checkbox color="success" size="small" />} sx={{ fontSize: '12px' }} label={ReactHtmlParser("<span class='labelDesc'><b>Solitary flower:  </b><span class='labelDesc'>a single flower that is not part of a grouped flower arrangement</span></span>   ")} />
                                <FormControlLabel control={<Checkbox color="success" size="small" />} sx={{ fontSize: '12px' }} label={ReactHtmlParser("<span class='labelDesc'><b>Spike:  </b><span class='labelDesc'>flower arrangement with stalkless (sessile) flowers arranged on a stem</span></span> <img src='/images/flower.png' style={{border:'1px solid grey'}} height='30' width='30'></img>")} />
                                <FormControlLabel control={<Checkbox color="success" size="small" />} sx={{ fontSize: '12px' }} label={ReactHtmlParser("<span class='labelDesc'><b>Umbel:  </b><span class='labelDesc'>flattish topped flower arrangement with stalked flowers rising from one point of a common stalk; the outer flowers open first </span></span>  <img src='/images/leaf.png' style={{border:'1px solid grey'}} height='30' width='30'></img>")} />
                            </FormGroup>
                            <div style={{ textAlign: 'right', padding: '8px' }}>
                                <Button variant="contained" color='success' size='small'>Apply Selection</Button>
                            </div>
                        </React.Fragment>
                    }
                >
                    <i className="bi bi-info-circle-fill" onClick={() => handleTooltipOpen()} />
                </HtmlTooltip> : name === 'petal_symmetry' ?
                    <HtmlTooltip
                        handleTooltipClose={handleTooltipClose}
                        open={open}
                        title={
                            <React.Fragment>
                                <Stack direction='row' alignItems='flex-end' justifyContent='space-between'>
                                    <h5 style={{ fontSize: '17px' }}>
                                        Petal symmetry
                                    </h5>
                                    <IconButton aria-label="close" onClick={handleTooltipClose}>
                                        <Close />
                                    </IconButton>
                                </Stack>
                                <Divider sx={{ mb: '10px' }} />
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox color="success" defaultChecked size="small" />} sx={{ fontSize: '12px' }} label={`Bilateral petal symmetry: flower can only be divided evenly in one way e.g. Orchids`} />
                                    <FormControlLabel control={<Checkbox color="success" size="small" />} sx={{ fontSize: '12px' }} label="Radial petal symmetry: flower can be divided evenly multiple ways e.g. Asters" />
                                </FormGroup>
                                <div style={{ textAlign: 'right', padding: '8px' }}>
                                    <Button variant="contained" color='success' size='small'>Apply Selection</Button>
                                </div>
                            </React.Fragment>
                        }
                    >
                        <i className="bi bi-info-circle-fill" onClick={() => handleTooltipOpen()} />
                    </HtmlTooltip> :
                    <HtmlTooltip
                        handleTooltipClose={handleTooltipClose}
                        open={open}
                        title={
                            <React.Fragment>
                                <Stack direction='row' alignItems='flex-end' justifyContent='space-between'>
                                    <h5 style={{ fontSize: '19px' }}>
                                        Invasive Species

                                    </h5>
                                    <IconButton aria-label="close" onClick={handleTooltipClose}>
                                        <Close />
                                    </IconButton>
                                </Stack>
                                <Divider sx={{ mb: '10px' }} />
                                <div style={{ fontSize: '14px', padding: '10px' }}>
                                    A plant that has been “accidentally or deliberately introduced into  <br></br>ecosystems beyond theirnative range and whose introduction or spread<br></br> negatively  impacts the environment, economy,and/or society including<br></br> human health.” –
                                    <a href="https://www.nbinvasives.ca/" target="_blank" rel="noopener"> <img style={{ height: '30px', marginLeft: '10px' }} src="https://images.squarespace-cdn.com/content/v1/6144adb9289b694822c3db7b/d90bd94b-def7-4184-8aad-f84ffec19e9b/favicon.ico?format=100w" /><em><span style={{ color: 'rgb(51, 153, 102)' }}> New Brunswick Invasive Species Council</span></em></a>
                                    <br></br>
                                    <p style={{ marginTop: '10px' }}><strong>
                                        <a onClick={loadInvasivePlantList} style={{ color: 'rgb(51, 153, 102)' , cursor:'pointer'}}>
                                            List of Invasive Species in New Brunswick.</a></strong></p>
                                </div>
                            </React.Fragment>
                        }
                    >
                        <h6
                            style={{ margin: '10px 8px', cursor: 'pointer' }} onClick={() => handleTooltipOpen()}>
                            <ErrorOutlineOutlined sx={{ color: 'white', borderRadius: '40px', backgroundColor: 'red' }} />
                        </h6>
                    </HtmlTooltip>}
            <style>
                {`
                    .MuiTooltip-arrow::before{
                        border: 2px solid black;
                        background-color: #e6f6f1;
                    }
                    .MuiFormControlLabel-label{
                        font-size: 12px
                    }
                    .MuiFormControlLabel-label {
                        display:flex;
                        align-items:center;
                        gap:18px
                    }
                    .MuiTooltip-tooltip .MuiStack-root{
                        background-color:#e7f9e8;
                        padding: 0 8px;
                    }
                    .MuiFormGroup-root{
                        padding: 8px
                    }
                    .labelDesc{
                        width: 35vw
                    }
                   
                    `}
            </style>
        </>

    );
}