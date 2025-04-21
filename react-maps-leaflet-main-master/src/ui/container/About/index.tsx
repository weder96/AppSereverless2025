import * as React from "react";
import "../../../style/App.css";

import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

import { Button } from 'antd';
import { Progress } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


import SampleCharts from '../../component/charts/sampleCharts'

import  CallToast  from "../ToastMessage/callToast"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '98%',
      margin: 'auto',
      marginTop: '20px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

function About(props: any) {
  const { t } = useTranslation();
  const classes = useStyles();
    
    return (
      <div id="page-map">
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>xs=12  
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    {t('main.header.welcome')}
                    <SampleCharts /> 
                  </Grid>
                  <Grid item xs={4}>
                    {t('main.header.welcome')}
                      <div className="site-card">
                      <Progress type="circle" 
                                percent={75} 
                                strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                          }}
                                trailColor={'#FFFFFF'}          
                      />
                      </div>
                  </Grid>
                </Grid>  
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>xs=12  
                  {t('main.header.welcome')}
                    <CallToast /> 
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>xs=12  {t('main.header.welcome')} </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=6
          <div>
            <Button type="primary">Button</Button> <br/><br/><br/>
            <Button type="primary" icon={<DownloadOutlined />} size={'large'}>
              Download
            </Button>
          </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
    </div>
    
    );
  }

export default  withTranslation()(About)
