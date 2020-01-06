import React, { useState } from 'react';
import {
  Button, Card, CardActions, CardContent, Grid, TextField, Typography,
} from '@material-ui/core';
import style from 'src/Styles';
import { signTextWithRSAPSS } from 'src/Api/wca';
import { openSnackbar } from 'src/Store/ui/UIActions';
import { useDispatch } from 'react-redux';

const RSAPSSSigning: React.FC = () => {
  const classes = style();

  const dispatch = useDispatch();

  const [message, setMessage] = useState();
  const [signature, setSignature] = useState();
  const [defaultValue, setDefaultValue] = useState(' ');

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();
    signTextWithRSAPSS(message)
      .then((text) => {
        setDefaultValue('');
        setSignature(text);
      })
      .catch(() => dispatch(openSnackbar('Please double check your input!')));
  };

  return (
    <Card className={classes.debugForm}>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="h2" color="primary">
            RSA-PSS Signing
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                required
                fullWidth
                rows="5"
                label="Message"
                id="rsa-pss-signing-message"
                name="rsa-pss-signing-message"
                type="text"
                placeholder="Please enter your message, which should be signed."
                variant="outlined"
                value={message}
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                ): void => setMessage(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                disabled
                rows="5"
                label="Signature"
                defaultValue={defaultValue}
                id="rsa-pss-signing-signature"
                name="rsa-pss-signing-signature"
                type="text"
                variant="outlined"
                value={signature}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button color="primary" type="submit">
              Sign
          </Button>
        </CardActions>
      </form>
    </Card>

  );
};

export default RSAPSSSigning;
