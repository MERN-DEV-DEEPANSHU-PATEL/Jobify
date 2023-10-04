import { createSlice } from "@reduxjs/toolkit";
import removeUserFromLocalStorage from "../utils/removeUserFromLocalStorage";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const location = localStorage.getItem("location");

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: location || "",
    jobLocation: location || "",
    showSidebar: false,
    isEditing: false,
    editJobId: "",
    position: "",
    company: "",
    jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
    jobType: "full-time",
    statusOptions: ["interview", "declined", "pending"],
    status: "pending",
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
    stats: {},
    monthlyApplications: [],
    search: "",
    searchStatus: "all",
    searchType: "all",
    sort: "latest",
    sortOptions: ["latest", "oldest", "a-z", "z-a"],
  },
  reducers: {
    displayAlert: (state, action) => {
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = action.payload.notMatch || "Please provide all values!";
    },
    clearAlert: (state) => {
      state.showAlert = false;
      state.alertType = "";
      state.alertText = "";
    },
    setupUserBegin: (state) => {
      state.isLoading = true;
    },
    setupUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.userLocation = action.payload.location;
      state.jobLocation = action.payload.location;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = action.payload.alertText;
      state.token = action.payload.token;
    },
    setupUserError: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = action.payload.msg;
    },
    updateUserBegin: (state) => {
      state.isLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.userLocation = action.payload.location;
      state.jobLocation = action.payload.location;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "Profile Updated Successful!!!!";
    },
    updateUserError: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = "There was an Error Refresh page and try again";
    },
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.jobLocation = null;
      state.userLocation = null;
      removeUserFromLocalStorage();
    },
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearValues: (state) => {
      // state.isEditing=false
      state.editJobId = "";
      state.position = "";
      state.company = "";
      state.jobLocation = state.userLocation;
      state.jobType = "full-time";
      state.status = "pending";
    },
    createJobBegin: (state) => {
      state.isLoading = true;
    },
    createJobSuccess: (state) => {
      state.isLoading = false;
      state.isEditing = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "New job Created";
    },
    createJobError: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.isEditing = false;
      state.alertType = "danger";
      state.alertText = "Create job wal error " + action.payload.msg;
    },
    getJobsBegin: (state) => {
      state.isLoading = true;
      state.showAlert = false;
    },
    getJobsSuccess: (state, action) => {
      state.isLoading = false;
      const { jobs, totalJobs, numOfPages } = action.payload;
      state.jobs = jobs;
      state.totalJobs = totalJobs;
      state.numOfPages = numOfPages;
    },
    setEditJob: (state, action) => {
      const job = state.jobs.find((job) => job._id === action.payload._id);
      const { _id, position, company, jobLocation, jobType, status } = job;
      state.isEditing = true;
      state.editJobId = _id;
      state.position = position;
      state.company = company;
      state.jobLocation = jobLocation;
      state.jobType = jobType;
      state.status = status;
    },
    deleteJobBegin: (state) => {
      state.isLoading = true;
    },
    deleteJobSuccess: (state) => {
      state.isLoading = false;
    },
    deleteJobError: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = action.payload.msg;
    },
    showStatsBegin: (state) => {
      state.isLoading = true;
      state.showAlert = false;
    },
    showStatsSuccess: (state, action) => {
      state.isLoading = false;
      state.stats = action.payload.stats;
      state.monthlyApplications = action.payload.monthlyApplications;
    },
    handleChange2: (state, action) => {
      state.page = 1;
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearFilters: (state) => {
      state.search = "";
      state.searchStatus = "all";
      state.searchType = "all";
      state.sort = "latest";
    },
    editJobBegin: (state) => {
      state.isLoading = true;
    },
    editJobSuccess: (state) => {
      state.isLoading = false;
      state.isEditing = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "Job Updated!";
    },
    editJobError: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.isEditing = false;
      state.alertType = "danger";
      state.alertText = action.payload.msg + " Try again later";
    },
    deleteUserBegin: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = "User Account Deleted";
      state.alertType = "success";
    },
    deleteUserError: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = action.payload.msg;
      state.alertType = "danger";
    },
  },
});

export const {
  displayAlert,
  clearAlert,
  setupUserBegin,
  setupUserSuccess,
  setupUserError,
  updateUserBegin,
  updateUserSuccess,
  updateUserError,
  toggleSidebar,
  logoutUser,
  handleChange,
  clearValues,
  createJobBegin,
  createJobError,
  createJobSuccess,
  getJobsBegin,
  getJobsSuccess,
  setEditJob,
  deleteJobBegin,
  deleteJobSuccess,
  deleteJobError,
  showStatsBegin,
  showStatsSuccess,
  handleChange2,
  clearFilters,
  editJobBegin,
  editJobError,
  editJobSuccess,
  deleteUserBegin,
  deleteUserSuccess,
  deleteUserError,
} = userSlice.actions;

export default userSlice.reducer;
