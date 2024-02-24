import React, { useState } from "react";
import { Box, Button, Container, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const toast = useToast();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Filter out non-.xlsx files
    const xlsxFiles = files.filter((file) => /\.xlsx$/.test(file.name));

    if (xlsxFiles.length !== files.length) {
      toast({
        title: "Some files were ignored!",
        description: "Only .xlsx files are accepted.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }

    setSelectedFiles(xlsxFiles);
  };

  const handleUpload = () => {
    // Here you would typically send the files to the server for processing
    toast({
      title: "Upload started!",
      description: "Your files are being processed.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={10}>
      <Stack spacing={6} align="center">
        <Heading as="h1" size="xl">
          Predictive Forecast Modeling
        </Heading>
        <Text>Upload your .xlsx files for predictive forecast modeling, including tasks like uniform formatting, merging datasets, splitting for vector storage, and preparing training and test models.</Text>
        <Box>
          <Input type="file" multiple accept=".xlsx" onChange={handleFileChange} hidden id="file-upload" />
          <Button leftIcon={<FaUpload />} onClick={() => document.getElementById("file-upload").click()}>
            Select Files
          </Button>
        </Box>
        {selectedFiles.length > 0 && (
          <Box>
            <Text>Selected Files:</Text>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </Box>
        )}
        <Button colorScheme="blue" onClick={handleUpload} isDisabled={selectedFiles.length === 0}>
          Upload and Process Files
        </Button>
      </Stack>
    </Container>
  );
};

export default Index;
