<script>
	// previous label
	if($page==1) {
	}
	
	// pages
	$pmin = ($page>$adjacents) ? ($page-$adjacents) : 1;
	// interval
	if($page<($tpages-$adjacents-1)) {
	// last
	if($page<($tpages-$adjacents)) {
	// next
	if($page<$tpages) {
	$out.= "</div></p></section>";
	return $out;
}