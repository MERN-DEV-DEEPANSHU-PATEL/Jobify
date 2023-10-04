import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import {
  clearAlert,
  showStatsBegin,
  showStatsSuccess,
} from "../../store/userSlice";
import authFetch from "../../utils/authFetch";

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const showStats = async () => {
    dispatch(showStatsBegin());
    try {
      const { data } = await authFetch("/api/v1/job/stats");
      dispatch(
        showStatsSuccess({
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        })
      );
    } catch (error) {
      alert("there was an show status error");
    }
    dispatch(clearAlert());
  };

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
