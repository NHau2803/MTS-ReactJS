import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  root: {
      padding: theme.spacing(1),
      // background: "red",
      width: "100%", 
      height: 300 
  },
 
}));

export function PieChartCustom(type){

    const classes = useStyles();
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
    console.log({type});

    const pieData = [
      {
          "name": "Chrome",
          "value": 68.85
      },
      {
          "name": "Firefox",
          "value": 7.91
      },
      {
          "name": "Edge",
          "value": 6.85
      },
      {
          "name": "Internet Explorer",
          "value": 6.14
      },
      {
          "name": "Others",
          "value": 10.25
      }
  ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}% | 40`}</label>
                </div>
            );
        }

        return null;
    };

        return (
            <div className={classes.root}>
            <ResponsiveContainer>
              <PieChart width={340} height={300} className={classes.color1}>
                  <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" >
                      {
                          pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                      }
                  </Pie>
                  
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
              </PieChart>
            </ResponsiveContainer>
            </div>
        )
}



