const generateFilenameForEndpoint1 = (req, file) => {
    const id = req.user._id
        console.log(id);
        const ts = id;
        const ext = file.originalname.split('.').pop()
        const name= `${ts}.${ext}`;
        cb(null, name);
};

const generateFilenameForEndpoint2 = (req, file) => {
    // Define your logic for generating a different filename for endpoint2
    // Example: const someParameter = req.params.someParameter;
    //          return `endpoint2_${someParameter}.${ext}`;
    return 'endpoint2_filename';  // Replace with your actual logic
};

module.exports = {
    generateFilenameForEndpoint1,
    generateFilenameForEndpoint2
};
