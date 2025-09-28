import { ROUTES } from '@/config/siteLinks';

export const generateBreadcrumbItems = (currentPath) => {
  const items = [ROUTES.HOME];
  const pathSegments = currentPath.split('/').filter(Boolean);

  let currentHref = '';
  for (const segment of pathSegments) {
    currentHref += `/${segment}`;
    const matchingRoute = Object.values(ROUTES).find(route => route.path === currentHref);
    if (matchingRoute) {
      items.push(matchingRoute);
    } else {
      // If no matching route found, use the segment as is
      items.push({ path: currentHref, labelKey: `link.${segment}` });
    }
  }

  return items;
};

