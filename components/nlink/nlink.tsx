import React, { ReactNode } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

interface NLinkProps {
	href?: string | { url?: string }
	to?: string
	className?: string
	activeClassName?: string
	children: ReactNode
}

const NLink = ({
	href,
	to,
	className,
	activeClassName,
	children,
}: NLinkProps) => {
	let NLinkElement
	let nlinkProps: {
		href?: string | { url: string }
		to?: string
		target?: string
		rel?: string
	} = {}

	if (to) {
		NLinkElement = Link
		nlinkProps.href = to
	}

	if (href) {
		NLinkElement = "a"
		if (typeof href === "string") {
			nlinkProps.href = href
		} else {
		}
		// to open the link on a new tab, make href an object with the property "url"
		if (typeof href === "object") {
			nlinkProps.href = href.url
			nlinkProps.target = "_blank"
			nlinkProps.rel = "noreferrer"
		}
	}

	return (
		<NLinkElement className={className} {...nlinkProps}>
			{children}
		</NLinkElement>
	)
}

NLink.propTypes = {
	href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	to: PropTypes.string,
	activeClassName: PropTypes.string,
}

export { NLink }
