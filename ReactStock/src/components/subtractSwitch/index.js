// SubtractModeSwitch.js
import React from 'react';
import { Switch, FormControlLabel } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const SubtractModeSwitch = ({ isSubtractMode, setIsSubtractMode }) => {
    const navigate = useNavigate();

    const handleToggleSubtractMode = () => {
        setIsSubtractMode(!isSubtractMode);
        console.log('Toggle subtract mode:', !isSubtractMode); //check toggle

        //Band aid fix to renavigate to the inventoryPage so that the reader remounts
        navigate('/inventoryPage')
    };

  return (
    <FormControlLabel
      control={<Switch checked={isSubtractMode} onChange={handleToggleSubtractMode} />}
      label="Subtract Mode"
    />
  );
};

export default SubtractModeSwitch;
