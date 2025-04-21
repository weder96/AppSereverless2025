import "../../style/App.css";

import React, { useState , useEffect} from "react";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      width: 350,
      margin: '0 5px'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
function BoxVotes(props: any) {
    const [vote, setVote] = useState(0);

    const contVotesByNumber = (nrVotavel: any, votes: any) => {
        let voteNrVotavel = votes ? votes.filter(vote => Number(vote.nr_votavel) === Number(nrVotavel)) : [];
        var valorInicial = 0;
        var soma = voteNrVotavel.reduce(function (acumulador, valorAtual) {
            return acumulador + valorAtual.qt_votos;
        }, valorInicial);
        setVote(soma);
    }
    

    useEffect(() => { 
        contVotesByNumber("22022", props.votes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const classes = useStyles();
    
    return (
            <div className={classes.root}>
                <Box component="span" m={0.2}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          {props.localVote.localVotacao}
                        </Typography>
                        <Typography variant="h5" component="h2">
                          seção: {props.localVote.secao2020 ? props.localVote.secao2020: []}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                          zona: {props.localVote.year2020 ? props.localVote.year2020 : []}
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {vote > 1 && 'Votos: '+vote}
                          {Number(vote) <= Number(1) && 'Voto: '+vote}
                        <br />
                        </Typography>
                    </CardContent>
                    </Card>
                </Box>
            </div>
        )
}

export default BoxVotes;