import { FormRow, FormRowSelect, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAlert,
  clearValues,
  createJobBegin,
  createJobError,
  createJobSuccess,
  displayAlert,
  editJobBegin,
  editJobError,
  editJobSuccess,
  handleChange,
} from "../../store/userSlice";
import authFetch from "../../utils/authFetch";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    editJobId,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const editJob = async () => {
    dispatch(editJobBegin());

    try {
      await authFetch.patch(`api/v1/job/${editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch(editJobSuccess());
      dispatch(clearValues());
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch(editJobError({ msg: error.response.data.msg }));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      dispatch(displayAlert());
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };
  const createJob = async () => {
    dispatch(createJobBegin());
    try {
      await authFetch.post("/api/v1/job", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch(createJobSuccess());
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      dispatch(createJobError({ msg: "create jo check kr" }));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
    return;
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                dispatch(clearValues());
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
