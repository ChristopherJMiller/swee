/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Button, TextField, Typography, Fab,
  Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment,
} from '@material-ui/core';
import {
  Schedule, Add,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import useStyles from '../css/EditServiceStyles';

const EMPTY_SERVICE = {
  name: '',
  type: '',
  subtype: '',
  time: 0,
  price: 0,
  description: '',
  banner: '',
  addons: [],
};

const NewService = ({
  onClickAdd,
}) => {
  const classes = useStyles();
  const [addonPrice, setAddonPrice] = useState('');
  const [addonName, setAddonName] = useState('');
  const [addons, setAddons] = useState([]);
  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState(EMPTY_SERVICE);

  const updateNewService = ([param, val]) => {
    const updatedNewService = { ...newService };
    updatedNewService[param] = val;
    setNewService(updatedNewService);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const saveNewService = () => {
    console.log(newService);
    onClickAdd(newService);
    setOpen(false);
    setNewService(EMPTY_SERVICE);
  };

  const addAddon = async () => {
    setOpen(false);
    updateNewService(['addons', [
      {
        name: addonName,
        price: addonPrice,
      },
    ]]);
    // Shouldn't be calling this here...
    //onClickAdd();
    return addons;
  };

  console.log(newService);

  return (
    <>
      <Fab color="primary" size="small" onClick={handleClickOpen}>
        <Add />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Service</DialogTitle>
        <DialogContent>
          <form className={classes.textfield}>
            <TextField value={newService.name} onChange={(e) => updateNewService(['name', e.target.value])} label="Name" required />
            <TextField value={newService.type} onChange={(e) => updateNewService(['type', e.target.value])} label="Type" required />
            <TextField value={newService.subtype} onChange={(e) => updateNewService(['subtype', e.target.value])} label="subtype" />
            <TextField value={newService.price} onChange={(e) => updateNewService(['price', Number.parseFloat(e.target.value)])} label="Price" type="number" />
            <TextField
              label="Time"
              className={classes.add}
              onChange={(e) => updateNewService(['time', Number.parseFloat(e.target.value)])}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Schedule />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography>mins</Typography>
                  </InputAdornment>
                ),
              }}
            />
            <TextField onChange={(e) => updateNewService(['banner', e.target.value])} label="Banner" />
            {/* <TextField onChange={(e) => setAddonName(e.target.value)} label="Addon Name" />
            <TextField onChange={(e) => setAddonPrice(e.target.value)} label="Addon Price" /> */}
            <TextField
              required
              onChange={(e) => updateNewService(['description', e.target.value])}
              multiline
              style={{ width: '88%' }}
              label="Description"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => saveNewService()} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

NewService.propTypes = {
  onClickAdd: PropTypes.func.isRequired,
  updateNewService: PropTypes.func.isRequired,
};

export default NewService;
