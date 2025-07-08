import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getMonthlyApplicationCounts } from "../../store/features/applicationSlice";

const AreaChartComponent = () => {
  const dispatch = useDispatch();
  const monthlyApplicaitons = useSelector(
    (state) => state.application.monthlyApplicaitons,
  );

  useEffect(() => {
    dispatch(getMonthlyApplicationCounts());
  }, [dispatch]);

  return (
    <section className="mb-24 flex flex-col items-center justify-center space-y-6">
      <h4 className="text-2xl capitalize">Monthly applications</h4>
      <ResponsiveContainer width="90%" height={300} className="mr-12 w-12">
        <AreaChart data={monthlyApplicaitons} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="dateApplied" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#1e3a8a"
            fill="#1d4ed8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
};

export default AreaChartComponent;
