import React, { useEffect, useState } from "react";
import "./TestingPage.css";
import axios from "axios";
export default function TestingPage() {
  const [request, setRequest] = useState({
    url: "",
    method: "POST",
    data: "",
  });

  const [active, setActive] = useState({
    POST: true,
    PUT: false,
    GET: false,
    DELETE: false,
  });

  const [response, setresponse] = useState({
    data: "",
    status: "",
  });

  function handleChange(e) {
    if (e.target.name === "data") {
      setRequest({ ...request, [e.target.name]: JSON.parse(e.target.value) });
    } else {
      setRequest({ ...request, [e.target.name]: e.target.value });
    }
  }

  function handleSubmit(e) {
    if (request.method === "GET") {
      axios
        .get(request.url)
        .then((data) => {
          console.log(data.data)
          setresponse({ ...response, data: data.data, status: data.status });
        })
        .catch((error) => {
          setresponse({
            ...response,
            data: error.response.data,
            status: error.response.status,
          });
        });
    } else if (request.method === "POST") {
      axios
        .post(request.url, request.data)
        .then((data) => {
          setresponse({ ...response, data: data.data, status: data.status });
        })
        .catch((error) => {
          setresponse({
            ...response,
            data: error.response.data,
            status: error.response.status,
          });
        });
    } else if (request.method === "PUT") {
      axios
        .put(request.url, request.data)
        .then((data) => {
          setresponse({ ...response, data: data.data, status: data.status });
        })
        .catch((error) => {
          setresponse({
            ...response,
            data: error.response.data,
            status: error.response.status,
          });
        });
    } else {
      axios
        .delete(request.url)
        .then((data) => {
          setresponse({ ...response, data: data.data, status: data.status });
        })
        .catch((error) => {
          setresponse({
            ...response,
            data: error.response.data,
            status: error.response.status,
          });
        });
    }
  }
  useEffect(() => {
    if (request.method === "GET") {
      setActive({
        ...active,
        POST: false,
        GET: true,
        PUT: false,
        DELETE: false,
      });
    } else if (request.method === "PUT") {
      setActive({
        ...active,
        POST: false,
        GET: false,
        PUT: true,
        DELETE: false,
      });
    } else if (request.method === "DELETE") {
      setActive({
        ...active,
        POST: false,
        GET: false,
        PUT: false,
        DELETE: true,
      });
    } else {
      setActive({
        ...active,
        POST: true,
        GET: false,
        PUT: false,
        DELETE: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request.method]);

  return (
    <div className="testBody">
      <div className="groupUrl">
        <input type="text" name="url" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>
          Check
        </button>
      </div>
      <div className="methods">
        <button
          className={`methodSubmit ${active.POST ? "active" : ""}`}
          onClick={() => {
            setRequest({ ...request, method: "POST" });
          }}
        >
          <h5>POST</h5>
        </button>
        <button
          className={`methodSubmit ${active.GET ? "active" : ""}`}
          onClick={() => {
            setRequest({ ...request, method: "GET" });
          }}
        >
          <h5>GET</h5>
        </button>
        <button
          className={`methodSubmit ${active.PUT ? "active" : ""}`}
          onClick={() => {
            setRequest({ ...request, method: "PUT" });
          }}
        >
          <h5>PUT</h5>
        </button>
        <button
          className={`methodSubmit ${active.DELETE ? "active" : " "}`}
          onClick={() => {
            setRequest({ ...request, method: "DELETE" });
          }}
        >
          <h5>DELETE</h5>
        </button>
      </div>
      <div className="inputData">
        <textarea
          type="text"
          name="data"
          onChange={handleChange}
          disabled={active.GET || active.DELETE}
        />
      </div>
      <div className="responseMain">
        <p className="res">Response</p>
        <div>
         {response.status && <p>Status : {response.status}</p>}
        </div>
      </div>
      <div className="response">
        <pre>{JSON.stringify(response.data, null, 2)}</pre>
      </div>
    </div>
  );
}
