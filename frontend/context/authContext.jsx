// Add error handling and logging in your registration function
const register = async (userData) => {
    try {
        setLoading(true);
        const response = await axios.post('/api/sellers/register', userData);
        console.log('Registration response:', response.data);
        
        if (response.data.success) {
            // Handle successful registration
            setMessage({ type: 'success', text: 'Registration successful!' });
        }
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        setMessage({ 
            type: 'error', 
            text: error.response?.data?.message || 'Registration failed'
        });
    } finally {
        setLoading(false);
    }
}; 