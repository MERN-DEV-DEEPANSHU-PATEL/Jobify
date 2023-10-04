import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import {
  clearAlert,
  deleteJobBegin,
  deleteJobError,
  deleteJobSuccess,
  getJobsBegin,
  getJobsSuccess,
  setEditJob,
} from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import authFetch from "../utils/authFetch";
const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const { page, searchStatus, searchType, sort, search } = useSelector(
    (state) => state.user
  );

  const getJobs = async () => {
    let url = `/api/v1/job?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch(getJobsBegin());

    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch(getJobsSuccess({ jobs, totalJobs, numOfPages }));
    } catch (error) {
      alert("There Was an error try again later");
    }

    dispatch(clearAlert());
  };

  const deleteJob = async (jobId) => {
    dispatch(deleteJobBegin());
    try {
      await authFetch.delete(`/api/v1/job/${jobId}`);
      dispatch(deleteJobSuccess());
      getJobs();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch(deleteJobError({ msg: error.response.data.msg }));
    }
    dispatch(clearAlert());
  };

  const dispatch = useDispatch();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => dispatch(setEditJob({ _id }))}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
