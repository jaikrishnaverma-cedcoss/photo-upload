import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import {
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
const initialState = {
  name: "",
  age: "",
  qualification: "10th",
  photo: "",
  idProof: "",
  photoMsg: "",
  idProofMsg: "",
  submit:false,
};
export default function Form() {
  const [state, setState] = React.useState<any>(initialState);
  const [preview, setPreview] = React.useState<any>();
  // create a preview as a side effect, whenever selected file is changed
  React.useEffect(() => {
    if (!state.photo) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(state.photo);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [state.photo]);
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | any
  ) => {
    const name = e.target.name ? e.target.name : e.currentTarget.name;
    const val = e.target.value ? e.target.value : e.currentTarget.value;
    if (name === "photo" || name === "idProof") {
      const imageFile = e.target.files
        ? e.target.files[0]
        : e.currentTarget.files[0];
      if (name === "photo") {
        if (
          !imageFile.name.match(/\.(png)$/) ||
          (imageFile.size < 50000 && imageFile.size > 200000)
        ) {
          state[name + "Msg"] = "invalid file.";
        } else {
          state[name + "Msg"] = "uploaded";
          state[name] = imageFile;
        }
      } else if (name === "idProof") {
        if (
          !imageFile.name.match(/\.(pdf)$/) ||
          (imageFile.size < 100000 && imageFile.size > 500000)
        ) {
          state[name + "Msg"] = "invalid file.";
        } else {
          state[name + "Msg"] = "uploaded";
          state[name] = imageFile;
        }
      }
    } else {
      state[name] = val;
    }
    setState({ ...state });
  };

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Student Registration Form
      </Typography>
      <Card sx={{ width: "100%", bgcolor: "#cfe8fc", mt: 1 }}>
        <CardContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              id="outlined-basic"
              value={state.name}
              onChange={onChangeHandler}
              label="Name"
              name="name"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="Age"
              type="number"
              variant="outlined"
              name="age"
              onChange={onChangeHandler}
              value={state.age}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Qualification</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.qualification}
              name="qualification"
              label="Qualification"
              onChange={onChangeHandler}
            >
              {["10th", "12th", "Graduation", "Post Graduation"].map((x) => (
                <MenuItem value={x}>{x}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <InputLabel
            id="demo-simple-select-label"
            sx={{ marginLeft: "5px", mt: 1 }}
          >
            Choose Photo
            {state.photo && (
              <CardMedia
                component="img"
                alt="green iguana"
                height="60"
                sx={{ maxWidth: "100px", width: "auto" }}
                image={preview}
              />
            )}
          </InputLabel>

          <small
            style={{ color: state.photoMsg === "uploaded" ? "green" : "red" }}
          >
            {state.photoMsg}
          </small>
          <Stack direction="row" alignItems="center" sx={{ mb: 2 }} spacing={2}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                name="photo"
                onChange={onChangeHandler}
                type="file"
              />
              <DriveFolderUploadIcon />
            </IconButton>
            <small>(image of size between 50 kb to 200 kb only png)</small>
          </Stack>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ marginLeft: "5px", mt: 1 }}
          >
            Choose Id proof
          </InputLabel>
          <small
            style={{ color: state.idProofMsg === "uploaded" ? "green" : "red" }}
          >
            {state.idProofMsg}
          </small>
          <Stack direction="row" alignItems="center" sx={{ mb: 2 }} spacing={2}>
            <IconButton
              color="primary"
              aria-label="upload id"
              component="label"
            >
              <input
                name="idProof"
                onChange={onChangeHandler}
                hidden
                accept="application/pdf"
                type="file"
              />
              <DriveFolderUploadIcon />
            </IconButton>
            <small>(only pdf file of size 100 kb to 500 kb)</small>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
          <Button variant="contained" onClick={()=>setState({...state,submit:true})} endIcon={<SendIcon />}>
            Submit
          </Button>
        </CardActions>
      </Card>
      {(state.submit && state.photoMsg ==='uploaded' && state.idProofMsg=== 'uploaded' && state.name && state.age)?<Card sx={{minWidth:'300px',px:3 ,mt:2, bgcolor: "#cfe8fc"}} >
        <Grid item xs={12} md={12} >
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Forms data
          </Typography>
            <List  >
                {Object.entries(state).map((x:any)=>{
                    if(x[0]!=='submit' && !x[0].includes('Msg'))
                       return <>
                        <ListItem  >
                  <ListItemText
                    primary={x[0]}
                    secondary={(x[0] === "photo" || x[0] === "idProof")?x[1].name :x[1]}
                  />
                </ListItem>
                        </>
                    })
                }
            </List>
        </Grid>
      </Card>:<small style={{color:'red'}}>Fill All Details please</small>}
    </>
  );
}
