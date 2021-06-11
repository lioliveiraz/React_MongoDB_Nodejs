import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllProfiles } from "../../store/actions/profile";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { useHistory } from "react-router-dom";
import { useStyles } from "./../../assets/css/Developers/developers";

import profile1 from "../../assets/images/profiles/profile1.jpg";

function Developers({ user_id, profiles, getAllProfiles }) {
  const [developers, setDevelopers] = useState();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    async function getDevs() {
      getAllProfiles();
    }
    getDevs();
  }, [getAllProfiles]);

  useEffect(() => {
    const developers = profiles.filter((user) => user._id !== user_id);
    setDevelopers(developers);
  }, [profiles, user_id]);

  const goToProfile = (id) => {
    history.push(`/developers/${id}`);
  };

  if (!developers) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <GridList cellHeight={180} className={classes.root}>
      {developers.map((developer) => (
        <GridListTile key={developer._id}>
          <img src={profile1} alt={developer.name} />
          <GridListTileBar
            title={developer.name}
            subtitle={developer.email}
            actionIcon={
              <IconButton onClick={() => goToProfile(developer._id)}>
                <InfoIcon color="secondary" />
              </IconButton>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  );
}
const MapStateToProps = (state) => {
  return {
    user_id: state.auth.user,
    profiles: state.profile.profiles,
  };
};

export default connect(MapStateToProps, { getAllProfiles })(Developers);
