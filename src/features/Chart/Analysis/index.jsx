import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from "@material-ui/core";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import analysisApi from "api/Analysis";
import { getAnalysisGenderObject, getAnalysisActiveObject } from "utils/getObject";
import Notification from "custom-fields/Notification";
import { COLOR_PRIMARY, SET_BACKGROUND_COLOR_PRIMARY, SET_COLOR_PRIMARY } from "styles/Color";
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(15)
    },
    rootPieCharts: {
        padding: theme.spacing(1),
        width: "100%", 
        height: 240 
    },
    text: {
        color: COLOR_PRIMARY,
    }

}));

export default function AnalysisPage() {
    const classes = useStyles();

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    // const [analysis, setAnalysis] = useState({});
    const [students, setStudents] = useState({});
    const [teachers, setTeachers] = useState({});
    const [teams, setTeams] = useState({});
    const [topics, setTopics] = useState({});

    const fetchData = async () => {
        analysisApi.search().then(res=>{
            if(res.errorMessage){
                setNotify({
                    isOpen: true,
                    message: res.errorMessage,
                    type: 'error'
                })
            }else{
                // setAnalysis(res.result); 
                setStudents(res.result.students);   
                setTeachers(res.result.teachers);
                setTeams(res.result.teams);
                setTopics(res.result.topics);
            }
        });
    }

    useEffect(() => { fetchData(); }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            console.log(payload)
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].payload.total} : ${payload[0].value}%`}</label>
                    
                </div>
            );
        }
        return null;
    };

    const CustomPieCharts = (pieData, showActive=false, showGender=false) =>{
        return (
            <div className={classes.rootPieCharts}>
            <ResponsiveContainer>
              <PieChart width={240} height={200}>
                  <Pie 
                    data={pieData} 
                    color="#000000" 
                    dataKey="value" 
                    nameKey="name" 
                    outerRadius={80} 
                    innerRadius={showGender ? 0 : 50}
                    fill="#8884d8" 
                    startAngle={showActive ? (pieData[0].value*3.6) : 360}
                    endAngle={0}
                    >
                      {
                          pieData.map((entry, index) => 
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} 
                            />
                        )
                      }
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
              </PieChart>
            </ResponsiveContainer>
            </div>
        )
    }
    const headerCharts = (title, data, icon) => {
        return(
            <h1 className={classes.text}>
                {title} <br/>
                {data.total} 
                {icon}
            </h1>
        );
    }
    
    return(
    <div className={classes.root}>
    <h1>Analysis</h1>
      <Grid container spacing={3}>

        <Grid item xs={12} >
            <Paper>

            </Paper>
        </Grid>
    
        <Grid item xs={12} sm={6}>
            {headerCharts("Student", students, <PersonIcon fontSize="small" style={SET_COLOR_PRIMARY}/>)}
            {CustomPieCharts(getAnalysisActiveObject(students), true, false)}
            {CustomPieCharts(getAnalysisGenderObject(students), false, true)}
        </Grid>

        <Grid item xs={12} sm={6}>
            {headerCharts("Teacher", teachers, <PersonIcon fontSize="small" style={SET_COLOR_PRIMARY}/>)}
            {CustomPieCharts(getAnalysisActiveObject(teachers), true, false)}
            {CustomPieCharts(getAnalysisGenderObject(teachers), false, true)}
        </Grid>

        <Grid item xs={12} sm={6}>
            {headerCharts("Team", teams, <PeopleIcon fontSize="small" style={SET_COLOR_PRIMARY}/>)}
            {CustomPieCharts(getAnalysisActiveObject(teams), true, false)}
        </Grid>

        <Grid item xs={12} sm={6}>
            {headerCharts("Topic", topics, <WorkIcon fontSize="small" style={SET_COLOR_PRIMARY}/>)}
            {CustomPieCharts(getAnalysisActiveObject(teachers), true, false)}
        </Grid>

        </Grid>

      <Notification
        notify={notify}
        setNotify={setNotify}
    />
    </div>
    );
}