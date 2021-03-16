import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Bar, Pie } from 'react-chartjs-2';
import Input from '../../components/UI/Input'
import { useSelector } from 'react-redux';
const Statistic = (props) => {

    const contribution = useSelector(state => state.contribution)
    const term = useSelector(state => state.term)
    const [terms, setTerms] = useState(term.terms)
    const [termId, setTermId] = useState('')
    const { statistic } = contribution

    console.log(terms)
    
    useEffect(() => {
        setTerms(term.terms)
        if (term.terms.length) {
            setTermId(term.terms[0]._id)
        }
    }, [term.terms])

    return (
        <Layout>

            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="col-lg-12">
                        <div className="row">
                            <div>
                                <Input
                                    label="Term"
                                    type='select'
                                    value={termId}
                                    onChange={(e) => setTermId(e.target.value)}
                                    options={terms}
                                    placeholder={'Select Term'}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <h5>Number of contributions within each Faculty for each term</h5>
                        </div>
                        <div className="row">
                            <Bar
                                data={{
                                    labels: statistic.filter(x => x._id.termId === termId).map(x => x._id.facultyName),
                                    datasets: [{
                                        label: 'Number of contributions',
                                        data: statistic.filter(x => x._id.termId === termId).map(x => x.count),
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)'
                                        ],
                                        borderWidth: 1
                                    }]
                                }}
                                height={400}
                                width={600}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                fontColor: "white",
                                                beginAtZero: true
                                            }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                                fontColor: "white",
                                                beginAtZero: true
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: false,
                                    }
                                }}
                            />
                        </div>

                        <div className="row">
                            <h5>Total public contribution each Faculty</h5>
                        </div>
                        <div className="row">
                            <Pie
                                data={{
                                    labels: statistic.filter(x => x._id.termId === termId).map(x => x._id.facultyName),
                                    datasets: [{
                                        label: 'abcd',
                                        data: statistic.filter(x => x._id.termId === termId).map(x => x.is_public),
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)'
                                        ],
                                        borderWidth: 1
                                    }]
                                }}
                                height={400}
                                width={600}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                fontColor: "white",
                                                beginAtZero: true
                                            }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                                fontColor: "white",
                                                beginAtZero: true
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: false,
                                    }
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Statistic

