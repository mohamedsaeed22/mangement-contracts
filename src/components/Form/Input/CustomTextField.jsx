import { TextField } from '@mui/material';

const CustomTextField = () => {
  return (
    <TextField
      sx={{
        width: '300px', // Custom width
        '& .MuiInputBase-root': {
          height: '20px', // Custom height
          fontSize: '16px', // Custom font size for input text
        },
        '& .MuiInputLabel-root': {
          fontSize: '16px', // Custom font size for label/placeholder text
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ccc', // Custom border color
          },
          '&:hover fieldset': {
            borderColor: '#aaa', // Custom border color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#000', // Custom border color when focused
          },
        },
      }}
      variant="outlined"
      label="Custom TextField"
    />
  );
};

export default CustomTextField;
