import { useState } from 'react';
import { 
  Container, 
  TextField, 
  Typography, 
  Box, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControl, 
  Button, 
  CircularProgress,
  Paper,
  Divider,
  Alert,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { Info, Copy, RotateCw } from 'lucide-react';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || '';

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Making request to:', `${API_URL}/api/email/generate`);
      console.log('Request payload:', { emailContent, tone });
      const response = await axios.post(`${API_URL}/api/email/generate`, {
        emailContent,
        tone
      });
      console.log('Response:', response);
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2));
    } catch (err) {
      console.error('Error details:', err);
      setError('Failed to generate reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setEmailContent('');
    setTone('');
    setGeneratedReply('');
    setError(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 600 }}>
          Email Reply Generator
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Generate professional email responses with the perfect tone and content
        </Typography>
      </Paper>

      <Box component={Paper} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" component="h2">
            Original Email
          </Typography>
          <Tooltip title="Paste the email you received here">
            <IconButton size="small">
              <Info size={18} />
            </IconButton>
          </Tooltip>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          placeholder="Paste the email content here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Tone</InputLabel>
          <Select
            value={tone}
            label="Tone"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">
              <em>Default</em>
            </MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="formal">Formal</MenuItem>
            <MenuItem value="empathetic">Empathetic</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            sx={{ flex: 1 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {generatedReply && (
        <Box component={Paper} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" component="h2">
              Generated Reply
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                <IconButton onClick={handleCopy}>
                  <Copy size={20} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Generate new reply">
                <IconButton onClick={handleSubmit} disabled={loading}>
                  <RotateCw size={20} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
            {generatedReply}
          </Typography>
          {tone && (
            <Chip 
              label={`Tone: ${tone.charAt(0).toUpperCase() + tone.slice(1)}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
      )}
      {error && (
        <Typography color='error' sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
    </Container>
  );
}

export default App;