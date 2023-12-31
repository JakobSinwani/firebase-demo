import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ClearIcon from "@mui/icons-material/Clear";

import WelcomeImage from "./assets/bg_image.png";
import { ChangeEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "./store/auth";
import { logout, signInWithGoogle } from "./services/authentication";
function App() {
  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${WelcomeImage})`,
        backgroundSize: "cover",
      }}
    >
      <Box bgcolor={"white"} style={{ opacity: "0.98" }}>
        <Welcome />
        <AuthSection />
        <DataBase />
        <Uploader />
      </Box>
    </Box>
  );
}

export default App;

const Welcome = () => {
  return (
    <Box sx={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Nakbar!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Gaza City's Premier Dining Experience
      </Typography>
      <Typography variant="body1" paragraph>
        Step 1: Log In for a Taste of Tradition
      </Typography>
      <Typography variant="body1" paragraph>
        Step 2: Create Your Perfect Order
      </Typography>

      <Typography variant="body1" paragraph>
        Step 3: Share Your Nakbar Experience
      </Typography>
    </Box>
  );
};
const AuthSection = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return (
    <Box display="flex" justifyContent="center">
      {isLoggedIn ? (
        <Button onClick={logout} variant="contained" color="primary">
          Log out
        </Button>
      ) : (
        <Button onClick={signInWithGoogle} variant="contained" color="primary">
          Log In to Start Your Journey
        </Button>
      )}
    </Box>
  );
};
const DataBase = () => {
  const [drink, setDrink] = useState<string>("");
  const handleChange = (e: SelectChangeEvent) => {
    setDrink(() => e.target.value);
  };
  const submitOrder = () => {
    if (!drink) return alert("please select your drink!");
    console.log(drink);
  };

  return (
    <Box m={10}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Select Drink</InputLabel>
        <Select
          defaultValue={""}
          onChange={handleChange}
          labelId="select-label"
          label={"Drinks"}
        >
          <MenuItem value={"bear"}>Bear</MenuItem>
          <MenuItem value={"arak"}>Arak</MenuItem>
        </Select>
        <Button
          onClick={submitOrder}
          variant="contained"
          color="primary"
          style={{
            borderRadius: 20,
            padding: "10px 20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            textTransform: "none",
            fontSize: "1rem",
            marginBlock: 10,
            width: 200,
          }}
        >
          Order Now
        </Button>
      </FormControl>
    </Box>
  );
};
const Uploader = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
  };

  return (
    <Box>
      <Box>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<PhotoCamera />}
          >
            Upload Image
          </Button>
        </label>
        {imagePreview && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
            <IconButton onClick={clearImage} color="secondary">
              <ClearIcon />
            </IconButton>
          </div>
        )}
      </Box>
      <Box>My Images:</Box>
    </Box>
  );
};
