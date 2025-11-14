import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationGuardProps {
  children: React.ReactNode;
  requiredPath?: string;
}

/**
 * NavigationGuard prevents direct URL access to screens
 * by checking if the user has visited the required previous screen
 */
export const NavigationGuard = ({ children, requiredPath }: NavigationGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user came from the required path or has visited it
    const hasVisited = sessionStorage.getItem('visited_paths');
    const visitedPaths = hasVisited ? JSON.parse(hasVisited) : [];

    // Define the expected flow order
    const flowOrder = ['/', '/story/1', '/story/2', '/timeline', '/choice/1', '/choice/2', '/finale'];
    const currentIndex = flowOrder.indexOf(location.pathname);

    if (currentIndex > 0) {
      // Check if all previous paths have been visited
      const previousPaths = flowOrder.slice(0, currentIndex);
      const hasVisitedAll = previousPaths.every(path => visitedPaths.includes(path));

      if (!hasVisitedAll) {
        console.warn(`Direct access to ${location.pathname} prevented. Redirecting to start.`);
        navigate('/', { replace: true });
        return;
      }
    }

    // Mark current path as visited
    if (!visitedPaths.includes(location.pathname)) {
      visitedPaths.push(location.pathname);
      sessionStorage.setItem('visited_paths', JSON.stringify(visitedPaths));
    }
  }, [location.pathname, navigate, requiredPath]);

  return <>{children}</>;
};
