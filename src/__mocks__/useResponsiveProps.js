/**
 * Mock implementation of useResponsiveProps hook
 * 
 * This mock simply returns the props passed to it, which is sufficient
 * for testing purposes.
 * 
 * @param {Object} props - The responsive props
 * @returns {Object} The same props, unmodified
 */
const useResponsiveProps = (props) => {
  return props;
};

export default useResponsiveProps;
