import "./Upload.css";

function Upload() {
    const APIPostData = "https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com/v1/report";

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        // Convert form data to a plain object
        const formJson = Object.fromEntries(formData.entries());

        // Format the data to match the required structure
        const apiData = {
            uid: formJson.uid,
            title: formJson.title,
            description: formJson.description,
            images: formJson.imageLinks ? formJson.imageLinks.split(",").map((link) => link.trim()) : [],
            latitude: formJson.latitude,
            longitude: formJson.longitude,
            address: formJson.address,
            city: formJson.city,
            state: formJson.state,
            country: formJson.country,
        };

        console.log("Data sent to API:", apiData);

        try {
            const response = await fetch(APIPostData, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(apiData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Response from API:", result);
                alert("Form submitted successfully!");
            } else {
                console.error("Error submitting form:", response.statusText);
                alert("Failed to submit form. Please try again.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("An error occurred while submitting the form. Please check your network.");
        }
    }

    return (
        <div className="upload-image shadow">
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    UID: <input name="uid" placeholder="Enter your UID here" required />
                </label>
                <br />
                <br />

                <label>
                    Issue Title: <input name="title" placeholder="Enter Issue Title" required />
                </label>
                <br />
                <br />

                <label>
                    Describe Issue:
                    <br />
                    <textarea
                        name="description"
                        rows="4"
                        cols="50"
                        placeholder="Enter Issue Description"
                        required
                    />
                </label>
                <br />
                <br />

                <label>
                    Latitude: <input type="number" name="latitude" step="any" required />
                </label>
                <br />
                <br />

                <label>
                    Longitude: <input type="number" name="longitude" step="any" required />
                </label>
                <br />
                <br />

                <label>
                    Address:
                    <br />
                    <textarea
                        name="address"
                        rows="2"
                        cols="50"
                        placeholder="Enter Address"
                        required
                    />
                </label>
                <br />
                <br />

                <label>
                    City: <input type="text" name="city" placeholder="Enter City Name" required />
                </label>
                <br />
                <br />

                <label>
                    State: <input type="text" name="state" placeholder="Enter State Name" required />
                </label>
                <br />
                <br />

                <label>
                    Country: <input type="text" name="country" placeholder="Enter Country Name" required />
                </label>
                <br />
                <br />

                <label>
                    Your Image, Issue Image (comma-separated): 
                    <input type="text" name="imageLinks" placeholder="Enter Image Links" />
                </label>
                <br />
                <br />

                <button type="submit" className="custom-upload-button">
                    Submit form
                </button>
            </form>
        </div>
    );
}

export default Upload;
