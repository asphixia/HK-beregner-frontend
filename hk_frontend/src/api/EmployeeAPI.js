export const calculateExpectedSalary = async (employeeData) => {
    try {
      const response = await fetch('http://localhost:8080/api/calculatexsalary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData)
      });
      
      if (!response.ok) {
        throw new Error('Fejl ved beregning af forventet løn');
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  };