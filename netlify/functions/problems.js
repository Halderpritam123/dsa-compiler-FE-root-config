exports.handler = async (event, context) => {
    // Handle GET request for /problems
    if (event.httpMethod === "GET") {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Problems data retrieved successfully!" }),
      };
    }
  
    return {
      statusCode: 405, // Method Not Allowed
      body: "Method Not Allowed",
    };
  };
  