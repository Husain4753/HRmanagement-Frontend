import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const CsvExporter = ({ data, filename, headers }) => {
  return (
    <CSVLink data={data} filename={filename} headers={headers}>
      <Button variant='contained' color='warning' startIcon={<FileDownloadIcon/>} size='small'>Export To CSV</Button> 
    </CSVLink>
  );
};

CsvExporter.propTypes = {
  data: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CsvExporter;
