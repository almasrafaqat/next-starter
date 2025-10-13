import CardDetailView from "./card-detail-view"

/**
 * createCardDetailRenderer wires your new detail card into any grid/list that expects a (row) => ReactNode renderer.
 * Usage:
 *   const renderCardView = createCardDetailRenderer({
 *     getTitle: r => `${r.project} — ${r.name}`,
 *     getSubtitle: r => r.department,
 *     getStatus: r => r.status,                     // string like 'Active' | 'In Progress'
 *     primaryAction: r => ({ label: 'Mark Complete', onClick: () => onComplete(r) }),
 *     actions: r => ([ { label:'Share', onClick:()=>share(r) } ]),
 *     schema: [
 *       { type:'status', field:'status' },
 *       { type:'date',   field:'deadline', label:'Deadline' },
 *       { type:'assignees', field:'assignees', label:'Assigned' },
 *       { type:'labels', field:'labels', label:'Labels' },
 *       // add more: 'boolean', 'string-array', 'importance', 'thumbnail', 'gallery', 'line-items', 'videos'
 *     ],
 *     tabs: r => ({ comments: r.comments, details: r.details, attachments: r.attachments }),
 *   })
 */
export function createCardDetailRenderer(options) {
  const {
    getTitle = (r) => r.title || r.name,
    getSubtitle,
    getStatus,
    primaryAction,
    actions,
    schema = [],
    tabs,
  } = options || {}

  return function renderCard(row) {
    return (
      <CardDetailView
        record={row}
        title={getTitle(row)}
        subtitle={getSubtitle ? getSubtitle(row) : undefined}
        status={getStatus ? getStatus(row) : undefined}
        primaryAction={primaryAction ? primaryAction(row) : undefined}
        actions={actions ? actions(row) : []}
        schema={schema}
        tabs={tabs ? tabs(row) : undefined}
      />
    )
  }
}
