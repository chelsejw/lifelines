import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

const ProfileForm = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [imgInputText, setImgInputText] = useState("");
  const [uploadStatus, setUploadStatus] = useState(
    "Click the button to upload!"
  );
  const [profile, setProfile] = useState("");
  const [formInput, setFormInput] = useState({});
  const [editSuccess, setEditSuccess] = useState(false);
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    axios
      .get(`/api/v1/auth/user-profile`)
      .then((res) => {
        console.log(res.data.profile);
        setProfile(res.data.profile);
        setFormInput(res.data.profile);

        res.data.img_url !== ""
          ? setUploadStatus("has_img")
          : setUploadStatus("no_img");
      })
      .catch((err) => {
        console.log(`erroorrrrrrr`);
        console.log(err);
      });
  }, []);

  const trackInputs = (input, field) => {
    console.log(`Input for ${field} is ${input}`);
    setFormInput((currentInput) => {
      return { ...currentInput, [field]: input };
    });
  };

  useEffect(() => {
    console.log(formInput);
  }, [formInput]);

  const openWidget = () => {
    cloudinary.openUploadWidget(
      {
        cloudName: "dwbuqa4dx",
        uploadPreset: "m7t9mejb",
        sources: ["local", "url"],
      },
      (error, result) => {
        if (error) {
          console.log(`Err,`, error);
          return setUploadStatus("failed");
        }
        if (result.event == "success") {
          console.log(`Result,`, result);
          setImgUrl(result.info.url);
          setUploadStatus("success");
          setFormInput((currentInput) => {
            return { ...currentInput, img_url: result.info.url };
          });
        }
      }
    );
  };

  useEffect(() => {
    switch (uploadStatus) {
      case "success":
        setImgInputText(imgUrl);
        break;
      case "failed":
        setImgInputText("FAILED UPLOAD");
        break;
      case "no_img":
        setImgInputText("Click the button to upload!");
        break;
      case "has_img":
        setImgInputText(profile.img_url);
        break;
      default:
        setImgInputText("Click the button to upload!");
        break;
    }
  }, [uploadStatus]);

  const patchRequest = () => {
    const token = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
    setEditStatus("");

    axios
      .patch(`/api/v1/auth/user-profile`, { profile: formInput })
      .then((res) => {
        console.log(res.data.status);
        console.log(res.data);

        setEditStatus("Updated successfully");
        setEditSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setEditStatus("Error updating.");
        setEditSuccess(false);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="container">
          <h2 className="mb-4"> Edit Your Profile</h2>

          {editStatus !== "" && (
            <div
              className={`alert alert-${editSuccess ? "success" : "danger"}`}
              role="alert"
            >
              {editStatus}
            </div>
          )}

          <div className="row my-2">
            <div className="col-6 pl-0">
              <label htmlFor="displayName">Display Name</label>
              <input
                onChange={(e) => trackInputs(e.target.value, e.target.name)}
                defaultValue={profile.display_name}
                className="form-control"
                id="displayName"
                name="display_name"
              />
            </div>
            <div className="col-6">
              <label htmlFor="imgInput">
                Profile Picture
                <span onClick={openWidget} className="btn-link btn-sm">
                  {uploadStatus == "has_img" ? "Change" : "Upload"}
                </span>
              </label>
              <input
                className="form-control"
                name="img_url"
                disabled="disabled"
                id="imgInput"
                placeholder={imgInputText}
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-2 pl-0">
              <label htmlFor="verified">Verified</label>
              <input
                className="form-control"
                id="verified"
                disabled="disabled"
                name="verified"
                placeholder={profile.verified ? "Verified" : "Not verified"}
              />
            </div>
            <div className="col-4">
              <label htmlFor="accountType">Account Type</label>
              <input
                className="form-control"
                id="accountType"
                name="account_type"
                disabled="disabled"
                placeholder={
                  profile.account_type
                }
              />
            </div>
            <div className="col-6">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                className="form-control"
                onChange={(e) => trackInputs(e.target.value, e.target.name)}
                placeholder="This will help improve your website experience."
                id="postalCode"
                name="address"
                defaultValue={profile.address}
              />
            </div>
          </div>

          <div className="row mb-5">
            <div className="col pl-0">
              <label htmlFor="bio">About Me</label>

              <input
                onChange={(e) => trackInputs(e.target.value, e.target.name)}
                className="form-control"
                name="bio"
                id="bio"
                defaultValue={profile.bio}
                placeholder="Tell us about yourself."
              />
            </div>
          </div>
          <div className="row">
              <button
                onClick={patchRequest}
                className="btn btn-secondary btn-block"
              >
                Update Profile
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
