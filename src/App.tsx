import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/shared/LoadingScreen';

// Lazy load route components for better performance
const IntroScreen = lazy(() => import('./components/IntroScreen').then(module => ({ default: module.IntroScreen })));
const StoryScreen = lazy(() => import('./components/StoryScreen').then(module => ({ default: module.StoryScreen })));
const TimelineScreen = lazy(() => import('./components/TimelineScreen').then(module => ({ default: module.TimelineScreen })));
const ChoiceScreen = lazy(() => import('./components/ChoiceScreen').then(module => ({ default: module.ChoiceScreen })));
const FinaleScreen = lazy(() => import('./components/FinaleScreen').then(module => ({ default: module.FinaleScreen })));
const NavigationGuard = lazy(() => import('./components/guards/NavigationGuard').then(module => ({ default: module.NavigationGuard })));

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen message="Loading..." />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<IntroScreen />} />
          <Route 
            path="/story/1" 
            element={
              <NavigationGuard>
                <StoryScreen storyIndex={0} />
              </NavigationGuard>
            } 
          />
          <Route 
            path="/story/2" 
            element={
              <NavigationGuard>
                <StoryScreen storyIndex={1} />
              </NavigationGuard>
            } 
          />
          <Route 
            path="/timeline" 
            element={
              <NavigationGuard>
                <TimelineScreen />
              </NavigationGuard>
            } 
          />
          <Route 
            path="/choice/1" 
            element={
              <NavigationGuard>
                <ChoiceScreen choiceIndex={0} />
              </NavigationGuard>
            } 
          />
          <Route 
            path="/choice/2" 
            element={
              <NavigationGuard>
                <ChoiceScreen choiceIndex={1} />
              </NavigationGuard>
            } 
          />
          <Route 
            path="/finale" 
            element={
              <NavigationGuard>
                <FinaleScreen />
              </NavigationGuard>
            } 
          />
          {/* 404 redirect to intro screen */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
