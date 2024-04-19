import React from 'react';
import { IconButton, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Footer = () => {
    return (
      <footer style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center', position: 'fixed', bottom: '0', left: '0', width: '100%', zIndex: '1000' }}>
        <div>
        <IconButton href="https://github.com/maciejmarchel12" target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
        </IconButton>
        <Typography variant="caption">GitHub</Typography>

        <IconButton href="https://maciejmarchel14.wixsite.com/fianl-year-project-l" target="_blank" rel="noopener noreferrer">
          <OpenInNewIcon  />
        </IconButton>
        <Typography variant="caption">Wix</Typography>

        <IconButton href="https://www.linkedin.com/in/maciej-m-marchel/" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </IconButton>
        <Typography variant="caption">LinkedIn</Typography>
        </div>

        <div>
          <Typography>
            Student: Maciej Marchel, Project Supervisor: Abraham Lizy
          </Typography>
        </div>
      </footer>
    );
  };
  
  export default Footer;